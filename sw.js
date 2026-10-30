const CACHE='fatwa-shell-v1';const SHELL=['./','./index.html','./manifest.webmanifest','./manifest-data.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin)return; e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(response=>{if(response.ok && !u.pathname.includes('/data/')){const copy=response.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return response;})));});
