const V='smp-v8',F=['./','index.html','manifest.json','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 const nav=e.request.mode==='navigate'||new URL(e.request.url).pathname.endsWith('index.html');
 e.respondWith(nav?fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request.url,c));return r}).catch(()=>caches.match(e.request.url,{ignoreSearch:true}).then(r=>r||caches.match('index.html')))
  :caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))});
