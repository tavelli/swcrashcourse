const SW_VERSION = "1";

const assets = 'swcrashcourse-assets-' + SW_VERSION;
const OFFLINEURL = "offline.html";

var expectedCaches = [
    assets
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(assets).then(function(cache) {
            return cache.addAll([
                OFFLINEURL,
                "trex.gif",
                "style.css"
            ]);
        })
    );
});

self.addEventListener('activate', event => {

    // remove old caches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if ( expectedCaches.indexOf(cacheName) === -1 ) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

});

self.addEventListener('fetch', event => {

  if (event.request.mode === 'navigate') {
    event.respondWith(
        fetch(event.request.url).catch(error => {
            // Return the offline page
            return caches.match(OFFLINEURL);
        })
    );
  }
  else{
    // Respond with everything else if we can
    event.respondWith(caches.match(event.request)
            .then(function (response) {
            return response || fetch(event.request);
        })
    );
  }
});
