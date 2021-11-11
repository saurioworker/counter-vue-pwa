const CACHE_NAME = "v1_cache_contador_app_vue"
const urlsToCache = [
    "./",
    "./img/favicon.png",
    "./img/chart_number_32.png",
    "./img/chart_number_64.png",
    "./img/chart_number_128.png",
    "./img/chart_number_256.png",
    "./img/chart_number_512.png",
    "./js/main.js",
    "./css/style.css",
    "https://unpkg.com/vue@next",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
];

// referencia al propio service worker y se registran listeners
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
})

self.addEventListener("adtivate", e => {
    const cacheWhiteList = [CACHE_NAME]
    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if (cacheWhiteList.indexOf(cacheNames) === -1) {
                                return caches.delete(cacheName)
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    )
})

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if (res) {
                    return res
                }

                return fetch(e.request);
            }
        )
    )
})