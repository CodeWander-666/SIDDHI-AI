const CACHE_NAME = 'kalki-models-v1';
const MODEL_URLS = [
  'https://huggingface.co/mlc-ai/SmolLM2-135M-Instruct-q0f16-MLC/resolve/main/params_shard_0.bin',
  'https://huggingface.co/mlc-ai/SmolLM2-135M-Instruct-q0f16-MLC/resolve/main/params_shard_1.bin',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(MODEL_URLS)));
});

self.addEventListener('fetch', event => {
  if (MODEL_URLS.some(url => event.request.url.includes(url))) {
    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
  }
});
