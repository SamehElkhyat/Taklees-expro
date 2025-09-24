// Global chunk error handler
let isReloading = false;

export const setupChunkErrorHandler = () => {
  // Listen for global unhandled errors
  window.addEventListener('error', (event) => {
    const { message, filename } = event;
    
    // Check if it's a chunk loading error
    if (
      message?.includes('Loading chunk') ||
      message?.includes('ChunkLoadError') ||
      filename?.includes('.chunk.js') ||
      event.error?.name === 'ChunkLoadError'
    ) {
      console.error('Chunk loading error detected:', event);
      handleChunkError();
    }
  });

  // Listen for promise rejections (which can be chunk errors)
  window.addEventListener('unhandledrejection', (event) => {
    const { reason } = event;
    
    if (
      reason?.message?.includes('Loading chunk') ||
      reason?.message?.includes('ChunkLoadError') ||
      reason?.name === 'ChunkLoadError'
    ) {
      console.error('Chunk loading promise rejection:', event);
      event.preventDefault(); // Prevent the error from being logged to console
      handleChunkError();
    }
  });
};

const handleChunkError = () => {
  if (isReloading) {
    return; // Prevent multiple reloads
  }

  isReloading = true;
  
  // Show a user-friendly message
  const existingModal = document.getElementById('chunk-error-modal');
  if (existingModal) {
    existingModal.remove();
  }

  // Create a modal for the error
  const modal = document.createElement('div');
  modal.id = 'chunk-error-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  modal.innerHTML = `
    <div style="
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 90%;
      text-align: center;
    ">
      <div style="
        width: 60px;
        height: 60px;
        margin: 0 auto 1rem;
        background: #fee2e2;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="24" height="24" fill="#dc2626" viewBox="0 0 24 24">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
      </div>
      <h2 style="margin: 0 0 0.5rem; color: #111827; font-size: 1.25rem; font-weight: 600;">
        خطأ في التحميل
      </h2>
      <p style="margin: 0 0 1.5rem; color: #6b7280; font-size: 0.875rem;">
        حدث خطأ أثناء تحميل جزء من الصفحة. سيتم إعادة تحميل الصفحة تلقائياً.
      </p>
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      ">
        <div style="
          width: 20px;
          height: 20px;
          border: 2px solid #e5e7eb;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 0.5rem;
        "></div>
        <span style="color: #6b7280; font-size: 0.875rem;">جاري إعادة التحميل...</span>
      </div>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;

  document.body.appendChild(modal);

  // Auto-reload after 2 seconds
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

// Initialize error handler when module loads
if (typeof window !== 'undefined') {
  setupChunkErrorHandler();
}

