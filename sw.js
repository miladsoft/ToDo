const CACHE_NAME = 'todo-v1.0.2';
const BASE_PATH = '/ToDo';

const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/404.html`,
  `${BASE_PATH}/js/main.js`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/assets/icons/icon-192x192.png`,
  `${BASE_PATH}/assets/icons/icon-512x512.png`,
  'https://cdn.jsdelivr.net/npm/vue@2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Cache failed:', err))
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Return offline page or fallback
        return caches.match(`${BASE_PATH}/index.html`);
      })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  if (event.tag === 'sync-tasks') {
    event.waitUntil(syncTasks());
  }
});

async function syncTasks() {
  // Sync tasks when coming back online
  console.log('Syncing tasks...');
}

// Push notification support
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New task update!',
    icon: `${BASE_PATH}/assets/icons/icon-192x192.png`,
    badge: `${BASE_PATH}/assets/icons/icon-72x72.png`,
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: `${BASE_PATH}/assets/icons/icon-72x72.png`
      },
      {
        action: 'close',
        title: 'Close',
        icon: `${BASE_PATH}/assets/icons/icon-72x72.png`
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('TODO App', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(`${BASE_PATH}/`)
    );
  }
});
