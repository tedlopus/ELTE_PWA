const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// The precacheAndRoute() method takes an array of URLs to precache. The self._WB_MANIFEST is an array that contains the list of URLs to precache.
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
// callback function that filters the css style and java scripts and worker
registerRoute(({ request }) => ['style', 'script', 'worker'].includes(request.destination),
// StaleWhileRevalidate loads the cached content right away and ensures updates to the cached content are used in the future
new StaleWhileRevalidate({
  // name of the cache
  cacheName: 'asset-cache',
  // The plugin will cache these headers up to 30 days
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
}));
