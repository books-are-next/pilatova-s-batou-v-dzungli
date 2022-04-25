/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-4e2190b';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./s_batou_v_dzungli__002.html","./s_batou_v_dzungli__007.html","./s_batou_v_dzungli__008.html","./s_batou_v_dzungli__009.html","./s_batou_v_dzungli__010.html","./s_batou_v_dzungli__011.html","./s_batou_v_dzungli__012.html","./s_batou_v_dzungli__013.html","./s_batou_v_dzungli__014.html","./s_batou_v_dzungli__015.html","./s_batou_v_dzungli__016.html","./s_batou_v_dzungli__017.html","./s_batou_v_dzungli__018.html","./s_batou_v_dzungli__019.html","./s_batou_v_dzungli__020.html","./s_batou_v_dzungli__021.html","./s_batou_v_dzungli__022.html","./s_batou_v_dzungli__023.html","./s_batou_v_dzungli__024.html","./s_batou_v_dzungli__025.html","./s_batou_v_dzungli__026.html","./s_batou_v_dzungli__027.html","./s_batou_v_dzungli__028.html","./s_batou_v_dzungli__029.html","./s_batou_v_dzungli__030.html","./s_batou_v_dzungli__031.html","./s_batou_v_dzungli__032.html","./s_batou_v_dzungli__033.html","./s_batou_v_dzungli__034.html","./s_batou_v_dzungli__035.html","./s_batou_v_dzungli__036.html","./s_batou_v_dzungli__037.html","./s_batou_v_dzungli__038.html","./s_batou_v_dzungli__039.html","./s_batou_v_dzungli__040.html","./s_batou_v_dzungli__041.html","./s_batou_v_dzungli__042.html","./s_batou_v_dzungli__043.html","./s_batou_v_dzungli__044.html","./s_batou_v_dzungli__045.html","./s_batou_v_dzungli__046.html","./s_batou_v_dzungli__047.html","./s_batou_v_dzungli__048.html","./s_batou_v_dzungli__049.html","./s_batou_v_dzungli__050.html","./s_batou_v_dzungli__051.html","./s_batou_v_dzungli__052.html","./s_batou_v_dzungli__053.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/obalka_s_batou_v_dzungli.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
