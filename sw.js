const V='zaytin-shell-v2',SDK='zaytin-sdk-v1',SHELL=['./','index.html','manifest.webmanifest','firebase-config.js','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!==SDK).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
 if(u.origin===location.origin){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put(r,c));return x}).catch(()=>caches.match(r).then(x=>x||caches.match('index.html'))))}
 else if(u.hostname==='www.gstatic.com'){e.respondWith(caches.open(SDK).then(async c=>{const m=await c.match(r);const n=fetch(r).then(x=>{c.put(r,x.clone());return x}).catch(()=>m);return m||n}))}});
