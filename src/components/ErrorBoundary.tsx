import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';
import { trackError } from '../utils/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  eventId?: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Track the error
    trackError(error, errorInfo);
    
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
      eventId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });
  }

  private handleRefresh = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.href = '/';
  };

  private handleReportError = () => {
    const { error, errorInfo, eventId } = this.state;
    
    const errorReport = {
      eventId,
      error: error?.toString(),
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Create mailto link with error report
    const subject = encodeURIComponent('Portfolio Error Report');
    const body = encodeURIComponent(`Hi Adil,

I encountered an error on your portfolio website. Here are the details:

Event ID: ${eventId}
Error: ${error?.message}
URL: ${window.location.href}
Time: ${new Date().toLocaleString()}

Error Details:
${JSON.stringify(errorReport, null, 2)}

Please let me know if you need any additional information.

Best regards`);

    window.open(`mailto:adilazhariosman@gmail.com?subject=${subject}&body=${body}`);
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Error Icon Header */}
              <div className="bg-red-500 p-6 text-center">
                <AlertTriangle className="h-16 w-16 text-white mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white">Oops! Something went wrong</h1>
              </div>
              
              {/* Error Content */}
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    We're sorry for the inconvenience
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    The portfolio encountered an unexpected error. This has been automatically logged 
                    and will be investigated. In the meantime, please try refreshing the page or 
                    return to the homepage.
                  </p>
                </div>

                {/* Error Details (Development Only) */}
                {import.meta.env.DEV && this.state.error && (
                  <details className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white mb-2">
                      Technical Details (Development Mode)
                    </summary>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <p className="font-medium mb-2">Error: {this.state.error.message}</p>
                      <pre className="whitespace-pre-wrap text-xs bg-gray-200 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                        {this.state.error.stack}
                      </pre>
                      {this.state.errorInfo && (
                        <>
                          <p className="font-medium mt-4 mb-2">Component Stack:</p>
                          <pre className="whitespace-pre-wrap text-xs bg-gray-200 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </>
                      )}
                    </div>
                  </details>
                )}

                {/* Event ID */}
                {this.state.eventId && (
                  <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Error ID:</span> {this.state.eventId}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Please include this ID when reporting the error
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={this.handleRefresh}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh Page
                  </button>
                  
                  <button
                    onClick={this.handleGoHome}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    <Home className="h-4 w-4" />
                    Go Home
                  </button>
                  
                  <button
                    onClick={this.handleReportError}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    <Mail className="h-4 w-4" />
                    Report Error
                  </button>
                </div>

                {/* Contact Information */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    If this problem persists, please contact me directly:
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <a
                      href="mailto:adilazhariosman@gmail.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      adilazhariosman@gmail.com
                    </a>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Response within 24 hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Help Text */}
            <div className="mt-6 text-center">
              <p className="text-white/70 text-sm">
                This error has been logged automatically and will be reviewed to improve the portfolio experience.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;