// PWA utilities and service worker registration
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAState {
  isInstalled: boolean;
  isInstallable: boolean;
  isOffline: boolean;
  installPrompt: BeforeInstallPromptEvent | null;
}

class PWAManager {
  private static instance: PWAManager;
  private state: PWAState = {
    isInstalled: false,
    isInstallable: false,
    isOffline: !navigator.onLine,
    installPrompt: null
  };
  private listeners: ((state: PWAState) => void)[] = [];

  public static getInstance(): PWAManager {
    if (!PWAManager.instance) {
      PWAManager.instance = new PWAManager();
    }
    return PWAManager.instance;
  }

  constructor() {
    this.initPWA();
  }

  private async initPWA() {
    // Register service worker
    await this.registerServiceWorker();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Check if app is already installed
    this.checkInstallation();
    
    // Set up offline/online detection
    this.setupNetworkListeners();
    
    // Set up background sync
    this.setupBackgroundSync();
  }

  private async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });

        console.log('[PWA] Service worker registered:', registration);

        // Handle service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available
                this.showUpdateNotification();
              }
            });
          }
        });

        // Listen for service worker controller changes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });

      } catch (error) {
        console.error('[PWA] Service worker registration failed:', error);
      }
    }
  }

  private setupEventListeners(): void {
    // Install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.state.installPrompt = e as BeforeInstallPromptEvent;
      this.state.isInstallable = true;
      this.notifyListeners();
    });

    // App installed
    window.addEventListener('appinstalled', () => {
      this.state.isInstalled = true;
      this.state.isInstallable = false;
      this.state.installPrompt = null;
      this.notifyListeners();
      
      // Track installation
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pwa_install', {
          event_category: 'engagement',
          event_label: 'app_installed'
        });
      }
    });
  }

  private checkInstallation(): void {
    // Check if running as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone ||
                        document.referrer.includes('android-app://');
    
    this.state.isInstalled = isStandalone;
    this.notifyListeners();
  }

  private setupNetworkListeners(): void {
    window.addEventListener('online', () => {
      this.state.isOffline = false;
      this.notifyListeners();
      this.showNetworkNotification('You\'re back online!', 'success');
    });

    window.addEventListener('offline', () => {
      this.state.isOffline = true;
      this.notifyListeners();
      this.showNetworkNotification('You\'re offline. Some features may be limited.', 'warning');
    });
  }

  private setupBackgroundSync(): void {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then((registration) => {
        // Background sync is supported
        console.log('[PWA] Background sync is supported');
      });
    }
  }

  public async installApp(): Promise<boolean> {
    if (!this.state.installPrompt) {
      return false;
    }

    try {
      await this.state.installPrompt.prompt();
      const choiceResult = await this.state.installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt');
        return true;
      } else {
        console.log('[PWA] User dismissed the install prompt');
        return false;
      }
    } catch (error) {
      console.error('[PWA] Install prompt failed:', error);
      return false;
    }
  }

  public getState(): PWAState {
    return { ...this.state };
  }

  public addListener(callback: (state: PWAState) => void): void {
    this.listeners.push(callback);
  }

  public removeListener(callback: (state: PWAState) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  private showUpdateNotification(): void {
    // Show a notification that new content is available
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Portfolio Updated!', {
        body: 'New content is available. Refresh to get the latest version.',
        icon: '/icon-192x192.png',
        tag: 'update-available'
      });
    }
  }

  private showNetworkNotification(message: string, type: 'success' | 'warning' | 'info'): void {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white transform transition-all duration-300 ${
      type === 'success' ? 'bg-green-600' : 
      type === 'warning' ? 'bg-yellow-600' : 
      'bg-blue-600'
    }`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  public async requestNotificationPermission(): Promise<boolean> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  public async storeOfflineFormData(data: any): Promise<void> {
    if (!('indexedDB' in window)) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open('PortfolioOffline', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['submissions'], 'readwrite');
        const store = transaction.objectStore('submissions');
        
        const submission = {
          data,
          timestamp: Date.now(),
          synced: false
        };
        
        store.add(submission);
        
        transaction.oncomplete = () => {
          resolve();
          // Request background sync
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
              if ('sync' in registration) {
                return registration.sync.register('contact-form');
              }
            });
          }
        };
        
        transaction.onerror = () => reject(transaction.error);
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('submissions')) {
          const store = db.createObjectStore('submissions', { keyPath: 'id', autoIncrement: true });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }
}

// Export utilities
export const pwaManager = PWAManager.getInstance();

// React hook for PWA state
export function usePWA() {
  const [pwaState, setPWAState] = useState(pwaManager.getState());

  useEffect(() => {
    const handleStateChange = (state: PWAState) => {
      setPWAState(state);
    };

    pwaManager.addListener(handleStateChange);
    return () => pwaManager.removeListener(handleStateChange);
  }, []);

  return {
    ...pwaState,
    install: pwaManager.installApp.bind(pwaManager),
    requestNotificationPermission: pwaManager.requestNotificationPermission.bind(pwaManager)
  };
}

// Touch gesture utilities
export class TouchGestureManager {
  private element: HTMLElement;
  private startX: number = 0;
  private startY: number = 0;
  private startTime: number = 0;
  private threshold: number = 50;
  private timeout: number = 300;

  constructor(element: HTMLElement) {
    this.element = element;
    this.setupTouchListeners();
  }

  private setupTouchListeners(): void {
    let startTouch: Touch | null = null;

    this.element.addEventListener('touchstart', (e) => {
      startTouch = e.touches[0];
      this.startX = startTouch.clientX;
      this.startY = startTouch.clientY;
      this.startTime = Date.now();
    }, { passive: true });

    this.element.addEventListener('touchend', (e) => {
      if (!startTouch) return;

      const endTouch = e.changedTouches[0];
      const deltaX = endTouch.clientX - this.startX;
      const deltaY = endTouch.clientY - this.startY;
      const deltaTime = Date.now() - this.startTime;

      // Check if it's a swipe gesture
      if (deltaTime < this.timeout && 
          (Math.abs(deltaX) > this.threshold || Math.abs(deltaY) > this.threshold)) {
        
        const direction = this.getSwipeDirection(deltaX, deltaY);
        this.handleSwipe(direction, { deltaX, deltaY, deltaTime });
      }

      startTouch = null;
    }, { passive: true });
  }

  private getSwipeDirection(deltaX: number, deltaY: number): 'left' | 'right' | 'up' | 'down' {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  }

  private handleSwipe(direction: string, details: any): void {
    const swipeEvent = new CustomEvent('swipe', {
      detail: { direction, ...details }
    });
    this.element.dispatchEvent(swipeEvent);
  }

  public destroy(): void {
    // Remove event listeners
    this.element.removeEventListener('touchstart', () => {});
    this.element.removeEventListener('touchend', () => {});
  }
}

// Auto-install PWA after user interaction
export function setupAutoInstall(): void {
  let userInteracted = false;
  
  const trackInteraction = () => {
    if (!userInteracted) {
      userInteracted = true;
      
      // Check if we should show install prompt after some time
      setTimeout(() => {
        const pwaState = pwaManager.getState();
        if (pwaState.isInstallable && !pwaState.isInstalled) {
          showInstallBanner();
        }
      }, 30000); // Show after 30 seconds
    }
  };

  // Track various user interactions
  ['click', 'scroll', 'keydown'].forEach(event => {
    document.addEventListener(event, trackInteraction, { once: true, passive: true });
  });
}

function showInstallBanner(): void {
  // Create install banner
  const banner = document.createElement('div');
  banner.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:w-96 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300';
  banner.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <h4 class="font-semibold">Install Portfolio</h4>
        <p class="text-sm opacity-90">Add to home screen for quick access</p>
      </div>
      <div class="flex gap-2 ml-4">
        <button id="pwa-install-btn" class="px-3 py-1 bg-white text-blue-600 rounded text-sm font-medium">
          Install
        </button>
        <button id="pwa-dismiss-btn" class="px-3 py-1 text-white border border-white/30 rounded text-sm">
          Later
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  // Handle install button
  banner.querySelector('#pwa-install-btn')?.addEventListener('click', async () => {
    const success = await pwaManager.installApp();
    if (success || !pwaManager.getState().isInstallable) {
      document.body.removeChild(banner);
    }
  });

  // Handle dismiss button
  banner.querySelector('#pwa-dismiss-btn')?.addEventListener('click', () => {
    document.body.removeChild(banner);
  });

  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (document.body.contains(banner)) {
      banner.style.transform = 'translateY(100%)';
      setTimeout(() => {
        if (document.body.contains(banner)) {
          document.body.removeChild(banner);
        }
      }, 300);
    }
  }, 10000);
}

// Initialize PWA
export function initPWA(): void {
  setupAutoInstall();
  
  // Request notification permission after user interaction
  document.addEventListener('click', async () => {
    await pwaManager.requestNotificationPermission();
  }, { once: true });
}