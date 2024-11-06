// Название кэша и файлы, которые нужно закэшировать
const CACHE_NAME = 'dog-icons-cache-v1';
const ICONS_TO_CACHE = [
    '/css/dogsimg/dogs10.webp',
    '/css/dogsimg/dogs3.webp',
    '/css/dogsimg/dogs5.webp',
    '/css/dogsimg/dogs6.webp',
    '/css/dogsimg/dogs7.webp',
    '/css/dogsimg/dogs8.webp',
    '/css/dogsimg/dogs12.webp',
    '/css/dogsimg/dogs13.webp'
];

// Установка Service Worker и кэширование иконок
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Открыт кэш:', CACHE_NAME);
                return cache.addAll(ICONS_TO_CACHE);
            })
    );
});

// Обработка запросов и возврат файлов из кэша, если они там есть
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Если ресурс есть в кэше, возвращаем его, иначе делаем запрос в сеть
                return response || fetch(event.request);
            })
    );
});

// Обновление кэша, удаление старого кэша при изменении версии
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Удаление старого кэша:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
