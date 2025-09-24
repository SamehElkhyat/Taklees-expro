// Simple service worker for chunk caching
const CACHE_NAME = 'takhlees-chunks-v1';

// Cache strategies
const CHUNK_CACHE_STRATEGY = 'stale-while-revalidate';
const CHUNK_PATTERNS = [
  /\/static\/js\/.*\.chunk\.js$/,
  /\/static\/css\/.*\.chunk\.css$/,
  /\/static\/js\/main\..*\.js$/,
  /\/static\/css\/main\..*\.css$/
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  self.skipWaiting(); // Force the waiting service worker to become the active service worker
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // Take control of all clients
    })
  );
});

// Fetch event - implement caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Check if it's a chunk file
  const isChunk = CHUNK_PATTERNS.some(pattern => pattern.test(url.pathname));

  if (isChunk) {
    event.respondWith(handleChunkRequest(request));
  }
});

// Handle chunk requests with stale-while-revalidate strategy
async function handleChunkRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    // Try to get from cache first
    const cachedResponse = await cache.match(request);
    
    // Start a fetch in the background
    const fetchPromise = fetch(request).then(async (networkResponse) => {
      // If fetch succeeds, update cache
      if (networkResponse.ok) {
        await cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }).catch((error) => {
      console.warn('Chunk fetch failed:', request.url, error);
      // If we have a cached version, we'll use it
      return null;
    });

    // If we have cached content, return it immediately
    if (cachedResponse) {
      // Still update cache in background
      fetchPromise.catch(() => {}); // Ignore fetch errors when we have cache
      return cachedResponse;
    }

    // If no cache, wait for network
    const networkResponse = await fetchPromise;
    
    if (networkResponse) {
      return networkResponse;
    }

    // If everything fails, return a basic error response
    return new Response('Chunk loading failed', {
      status: 503,
      statusText: 'Service Unavailable'
    });

  } catch (error) {
    console.error('Service worker error:', error);
    
    // Try to get from cache as last resort
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return error response
    return new Response('Chunk loading failed', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

