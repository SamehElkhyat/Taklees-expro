import React, { Suspense } from 'react';
import ChunkErrorBoundary from './ChunkErrorBoundary';

// Loading fallback component
const LoadingFallback = ({ text = "جاري التحميل..." }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600 font-medium">{text}</p>
    </div>
  </div>
);

// Enhanced lazy loading with retry mechanism
export const retryLazyLoad = (importFunction, retries = 3) => {
  return React.lazy(() => 
    importFunction().catch((error) => {
      console.error('Lazy loading failed:', error);
      
      // If it's a chunk loading error and we have retries left
      if (retries > 0 && (
        error?.name === 'ChunkLoadError' || 
        error?.message?.includes('Loading chunk') ||
        error?.message?.includes('ChunkLoadError')
      )) {
        console.log(`Retrying lazy load... (${retries} retries left)`);
        
        // Wait a bit before retrying
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(retryLazyLoad(importFunction, retries - 1));
          }, 1000);
        });
      }
      
      // If no retries left or different error, throw it
      throw error;
    })
  );
};

// Wrapper component for lazy-loaded components
const LazyComponentWrapper = ({ children, fallback = <LoadingFallback /> }) => {
  return (
    <ChunkErrorBoundary>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ChunkErrorBoundary>
  );
};

export default LazyComponentWrapper;

