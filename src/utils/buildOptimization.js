// Build optimization utilities

// Service worker to cache chunks and handle offline scenarios
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js';
      
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, refresh to load new chunks
                  if (confirm('نسخة جديدة متوفرة. هل تريد إعادة تحميل الصفحة؟')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('SW registration failed: ', error);
        });
    });
  }
};

// Preload critical chunks
export const preloadCriticalChunks = () => {
  const criticalChunks = [
    '/static/js/main.',
    '/static/css/main.'
  ];

  criticalChunks.forEach((chunkPattern) => {
    // Find actual chunk files that match the pattern
    const scripts = document.querySelectorAll('script[src*="' + chunkPattern + '"]');
    const links = document.querySelectorAll('link[href*="' + chunkPattern + '"]');
    
    [...scripts, ...links].forEach((element) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = element.tagName === 'SCRIPT' ? 'script' : 'style';
      link.href = element.src || element.href;
      document.head.appendChild(link);
    });
  });
};

// Check chunk health
export const checkChunkHealth = async () => {
  try {
    // Try to fetch a known chunk to test connectivity
    const response = await fetch('/static/js/main.js', { 
      method: 'HEAD',
      cache: 'no-cache'
    });
    
    if (!response.ok) {
      console.warn('Chunk health check failed:', response.status);
      return false;
    }
    
    return true;
  } catch (error) {
    console.warn('Chunk health check error:', error);
    return false;
  }
};

// Initialize optimizations
export const initializeBuildOptimizations = () => {
  // Register service worker for chunk caching
  registerServiceWorker();
  
  // Preload critical chunks
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalChunks);
  } else {
    preloadCriticalChunks();
  }
  
  // Periodic chunk health check
  setInterval(checkChunkHealth, 60000); // Check every minute
};

