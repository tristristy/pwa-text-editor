const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
//https://web.dev/learn/pwa/workbox/

const CASHE_NAME = "pwa-text-cashe"
const urlsToCashe = [
'/',
'/index.html',
'/css/styles.css',
'/js/index.js',
'/images/logo.png'
]

self.addEventListener("install", (event) => {
  // const files = ["/offline.html"]; // you can add more resources here
  event.waitUntil(
    self.caches.open(CASHE_NAME).then((cache) => cache.addAll(urlsToCashe))
  );
});

registerRoute();
