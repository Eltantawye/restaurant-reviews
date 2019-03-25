//Service Worker

const cacheName = 'v1';

//install event
self.addEventListener('install', (e) => {
  e.waitUntil(
      caches.open(cacheName)
      .then(cache => {return cache.addAll([
        '/' ,
        '/index.html' ,
        '/restaurant.html' ,
        'css/styles.css' ,
        'js/dbhelper.js' ,
        'data/restaurants.json' ,
        'js/main.js' ,
        'js/restaurant_info.js' ,
        'img/1.jpg' ,
        'img/2.jpg' ,
        'img/3.jpg' ,
        'img/4.jpg' ,
        'img/5.jpg' ,
        'img/6.jpg' ,
        'img/7.jpg' ,
        'img/8.jpg' ,
        'img/9.jpg' ,
        'img/10.jpg'
      ]);
    })
  );
});

//activate event
self.addEventListener('activate',(e) => {
  //ensure that our current cache is enabled and delete prev caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName){
            return caches.delete(cache);
          }
        })
      )
    })
  )
});

// fetch event to show our app in offline mode
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request).then((response) => {
          const responseClone = response.clone();
          caches.open(cacheName).then((cache) => {
          cache.put(e.request, responseClone);
        })
          return response;
      })
    })
  );
});
