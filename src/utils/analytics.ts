import { track } from '@vercel/analytics';

// Page views and Web Vitals are collected by <Analytics /> and <SpeedInsights /> in App.tsx.
// This module only reports custom events.

export const trackError = (error: Error, errorInfo?: unknown) => {
  track('javascript_error', { message: error.message.slice(0, 255) });
  console.error('Tracked Error:', error, errorInfo);
};
