import React from 'react';

class ChunkErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      isRefreshing: false,
      error: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Check if this is a chunk loading error
    if (error?.name === 'ChunkLoadError' || 
        error?.message?.includes('Loading chunk') ||
        error?.message?.includes('ChunkLoadError')) {
      return { hasError: true, error };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for debugging
    console.error('Chunk loading error:', error, errorInfo);
    
    // Check if it's a chunk loading error
    if (error?.name === 'ChunkLoadError' || 
        error?.message?.includes('Loading chunk') ||
        error?.message?.includes('ChunkLoadError')) {
      
      // Auto-retry by refreshing the page after a short delay
      setTimeout(() => {
        console.log('Attempting to reload due to chunk loading error...');
        window.location.reload();
      }, 1000);
    }
  }

  handleRefresh = () => {
    this.setState({ isRefreshing: true });
    // Force a hard refresh to get the latest chunks
    window.location.reload();
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">خطأ في التحميل</h2>
              <p className="text-gray-600 text-sm mb-4">
                حدث خطأ أثناء تحميل الصفحة. سيتم إعادة التحميل تلقائياً...
              </p>
              
              {this.state.isRefreshing && (
                <div className="flex items-center justify-center mb-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-sm text-gray-600">جاري إعادة التحميل...</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <button
                onClick={this.handleRefresh}
                disabled={this.state.isRefreshing}
                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50"
              >
                {this.state.isRefreshing ? 'جاري التحديث...' : 'إعادة تحميل الصفحة'}
              </button>
              
              <button
                onClick={this.handleRetry}
                className="w-full bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200"
              >
                المحاولة مرة أخرى
              </button>
            </div>
            
            <div className="mt-6 text-xs text-gray-500">
              <details>
                <summary className="cursor-pointer hover:text-gray-700">تفاصيل الخطأ</summary>
                <pre className="mt-2 text-left bg-gray-100 p-2 rounded text-xs overflow-auto">
                  {this.state.error?.message || 'Unknown error'}
                </pre>
              </details>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChunkErrorBoundary;

