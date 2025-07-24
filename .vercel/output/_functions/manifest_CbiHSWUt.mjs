import { h as decodeKey } from './chunks/astro/server_BxFtCGAt.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DKEkiTLx.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/Documentos/Desktop/enhanced/app/","cacheDir":"file:///D:/Documentos/Desktop/enhanced/app/node_modules/.astro/","outDir":"file:///D:/Documentos/Desktop/enhanced/app/dist/","srcDir":"file:///D:/Documentos/Desktop/enhanced/app/src/","publicDir":"file:///D:/Documentos/Desktop/enhanced/app/public/","buildClientDir":"file:///D:/Documentos/Desktop/enhanced/app/dist/client/","buildServerDir":"file:///D:/Documentos/Desktop/enhanced/app/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.11.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/stream/[sessionid]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/stream\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"stream","dynamic":false,"spread":false}],[{"content":"sessionId","dynamic":true,"spread":false}]],"params":["sessionId"],"component":"src/pages/api/stream/[sessionId].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/index.ts","pathname":"/api","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dot-grid-claude.CyhSZsDE.css"}],"routeData":{"route":"/ui-design/dot-grid","isIndex":false,"type":"page","pattern":"^\\/UI-design\\/dot-grid\\/?$","segments":[[{"content":"UI-design","dynamic":false,"spread":false}],[{"content":"dot-grid","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/UI-design/dot-grid.astro","pathname":"/UI-design/dot-grid","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dot-grid-claude.CyhSZsDE.css"},{"type":"inline","content":"body{margin:0;padding:20px;background:linear-gradient(135deg,#0f0f23,#1a1a2e);color:#fff;font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;min-height:100vh}.container[data-astro-cid-uchuodum]{max-width:1200px;margin:0 auto}.header[data-astro-cid-uchuodum]{text-align:center;padding:40px 0;border-bottom:1px solid #333;margin-bottom:40px}.header[data-astro-cid-uchuodum] h1[data-astro-cid-uchuodum]{font-size:3em;margin:0;color:#0f8;text-shadow:0 0 20px #00ff88}.demo-section[data-astro-cid-uchuodum]{margin:40px 0;padding:30px;background:#ffffff0d;border-radius:15px;border:1px solid rgba(0,255,136,.2)}.demo-section[data-astro-cid-uchuodum] h2[data-astro-cid-uchuodum]{color:#0f8;margin-bottom:20px}.text-input[data-astro-cid-uchuodum]{width:100%;padding:15px;font-size:1.1em;background:#0000004d;border:2px solid #00ff88;border-radius:8px;color:#fff;margin-bottom:20px}.controls[data-astro-cid-uchuodum]{margin:20px 0;display:flex;gap:20px;flex-wrap:wrap;align-items:center}.control-group[data-astro-cid-uchuodum]{display:flex;align-items:center;gap:10px}.control-group[data-astro-cid-uchuodum] label[data-astro-cid-uchuodum]{color:#0f8;font-weight:700}.control-group[data-astro-cid-uchuodum] input[data-astro-cid-uchuodum],.control-group[data-astro-cid-uchuodum] select[data-astro-cid-uchuodum]{background:#0000004d;border:1px solid #00ff88;color:#fff;padding:8px;border-radius:4px}.preview[data-astro-cid-uchuodum]{background:#0006;padding:30px;border-radius:10px;border:1px solid rgba(0,255,136,.3);margin:20px 0;min-height:150px;display:flex;align-items:center;justify-content:center;overflow:auto}.dot-display[data-astro-cid-uchuodum]{font-family:Courier New,monospace;text-align:center;line-height:1}.dot-char[data-astro-cid-uchuodum]{display:inline-block;margin:0 2px;vertical-align:top}.dot-row[data-astro-cid-uchuodum]{display:block;height:var(--dot-size);line-height:var(--dot-size)}.dot[data-astro-cid-uchuodum]{display:inline-block;width:var(--dot-size);height:var(--dot-size);margin:0 1px;border-radius:50%;transition:all .3s ease}.dot[data-astro-cid-uchuodum].on{background:var(--dot-color);box-shadow:0 0 10px var(--dot-color)}.dot[data-astro-cid-uchuodum].off{background:#ffffff1a}.examples[data-astro-cid-uchuodum]{display:grid;gap:20px}.example-item[data-astro-cid-uchuodum]{background:#0006;padding:20px;border-radius:10px;text-align:center}.example-label[data-astro-cid-uchuodum]{color:#0f8;margin-bottom:10px;font-size:.9em}.btn[data-astro-cid-uchuodum]{background:linear-gradient(45deg,#0f8,#00cc6a);color:#000;padding:12px 24px;border:none;border-radius:25px;font-weight:700;cursor:pointer;margin:5px;transition:all .3s}.btn[data-astro-cid-uchuodum]:hover{transform:translateY(-2px);box-shadow:0 5px 20px #00ff884d}.download-section[data-astro-cid-uchuodum]{text-align:center;padding:30px;background:#00ff881a;border-radius:15px;margin:40px 0}.features[data-astro-cid-uchuodum]{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin:40px 0}.feature[data-astro-cid-uchuodum]{padding:20px;background:#ffffff08;border-radius:10px;border-left:4px solid #00ff88}.feature[data-astro-cid-uchuodum] h3[data-astro-cid-uchuodum]{color:#0f8;margin-bottom:10px}\n"}],"routeData":{"route":"/ui-design/dot-grid-claude","isIndex":false,"type":"page","pattern":"^\\/UI-design\\/dot-grid-claude\\/?$","segments":[[{"content":"UI-design","dynamic":false,"spread":false}],[{"content":"dot-grid-claude","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/UI-design/dot-grid-claude.astro","pathname":"/UI-design/dot-grid-claude","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dot-grid-claude.CyhSZsDE.css"}],"routeData":{"route":"/ui-design/dot-grid-to-font","isIndex":false,"type":"page","pattern":"^\\/UI-design\\/dot-grid-to-font\\/?$","segments":[[{"content":"UI-design","dynamic":false,"spread":false}],[{"content":"dot-grid-to-font","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/UI-design/dot-grid-to-font.astro","pathname":"/UI-design/dot-grid-to-font","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dot-grid-claude.CyhSZsDE.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/Documentos/Desktop/enhanced/app/src/pages/UI-design/dot-grid-claude.astro",{"propagation":"none","containsHead":true}],["D:/Documentos/Desktop/enhanced/app/src/pages/UI-design/dot-grid-to-font.astro",{"propagation":"none","containsHead":true}],["D:/Documentos/Desktop/enhanced/app/src/pages/UI-design/dot-grid.astro",{"propagation":"none","containsHead":true}],["D:/Documentos/Desktop/enhanced/app/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/stream/[sessionId]@_@ts":"pages/api/stream/_sessionid_.astro.mjs","\u0000@astro-page:src/pages/api/index@_@ts":"pages/api.astro.mjs","\u0000@astro-page:src/pages/UI-design/dot-grid-claude@_@astro":"pages/ui-design/dot-grid-claude.astro.mjs","\u0000@astro-page:src/pages/UI-design/dot-grid-to-font@_@astro":"pages/ui-design/dot-grid-to-font.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/UI-design/dot-grid@_@astro":"pages/ui-design/dot-grid.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.11.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","D:/Documentos/Desktop/enhanced/app/node_modules/.pnpm/astro@5.11.1_typescript@5.8.3/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C5lu7475.mjs","\u0000@astrojs-manifest":"manifest_CbiHSWUt.mjs","D:/Documentos/Desktop/enhanced/app/src/components/MatrixPanel":"_astro/MatrixPanel.FXp696lA.js","@astrojs/react/client.js":"_astro/client.BPIbHqJh.js","D:/Documentos/Desktop/enhanced/app/src/pages/UI-design/dot-grid.astro?astro&type=script&index=0&lang.ts":"_astro/dot-grid.astro_astro_type_script_index_0_lang.CF6aBMDw.js","D:/Documentos/Desktop/enhanced/app/src/pages/UI-design/dot-grid-claude.astro?astro&type=script&index=0&lang.ts":"_astro/dot-grid-claude.astro_astro_type_script_index_0_lang.C6-4HUh2.js","D:/Documentos/Desktop/enhanced/app/src/pages/UI-design/dot-grid-to-font.astro?astro&type=script&index=0&lang.ts":"_astro/dot-grid-to-font.astro_astro_type_script_index_0_lang.CGu_tXdO.js","D:/Documentos/Desktop/enhanced/app/src/components/Chat.astro?astro&type=script&index=0&lang.ts":"_astro/Chat.astro_astro_type_script_index_0_lang.CqlsF4aG.js","D:/Documentos/Desktop/enhanced/app/node_modules/.pnpm/astro@5.11.1_typescript@5.8.3/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.D98dxaWf.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/Documentos/Desktop/enhanced/app/src/components/Chat.astro?astro&type=script&index=0&lang.ts","const t=[];for(let e=0;e<256;++e)t.push((e+256).toString(16).slice(1));function d(e,n=0){return(t[e[n+0]]+t[e[n+1]]+t[e[n+2]]+t[e[n+3]]+\"-\"+t[e[n+4]]+t[e[n+5]]+\"-\"+t[e[n+6]]+t[e[n+7]]+\"-\"+t[e[n+8]]+t[e[n+9]]+\"-\"+t[e[n+10]]+t[e[n+11]]+t[e[n+12]]+t[e[n+13]]+t[e[n+14]]+t[e[n+15]]).toLowerCase()}let a;const u=new Uint8Array(16);function i(){if(!a){if(typeof crypto>\"u\"||!crypto.getRandomValues)throw new Error(\"crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported\");a=crypto.getRandomValues.bind(crypto)}return a(u)}const l=typeof crypto<\"u\"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),r={randomUUID:l};function s(e,n,c){if(r.randomUUID&&!e)return r.randomUUID();e=e||{};const o=e.random??e.rng?.()??i();if(o.length<16)throw new Error(\"Random bytes length must be >= 16\");return o[6]=o[6]&15|64,o[8]=o[8]&63|128,d(o)}const p=document.querySelector(\"form\"),m=document.getElementById(\"response\"),y=()=>{try{let e=\"\";const n=new EventSource(\"http://localhost:3000/api/chat/4b2dd990-284a-4efe-afd5-ffa9ac65430c\");n.onmessage=c=>{if(c.data===\"[DONE]\"){n.close();return}const o=JSON.parse(c.data);e+=o.data,m.textContent=e},n.onopen=()=>{console.log(\"Conexión establecida\")},n.onerror=c=>{console.log(\"Error en la transmisión\",c),n.close()}}catch(e){console.log(e)}},g=async e=>{e.preventDefault();const n=e.target[0],c={content:n.value,id:s(),timestamp:new Date,sender:\"user:\"+s()};n.value=\"\",(await fetch(\"http://localhost:3000/api/chat/4b2dd990-284a-4efe-afd5-ffa9ac65430c\",{method:\"PATCH\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({message:c})})).ok&&y()};p.addEventListener(\"submit\",g);"]],"assets":["/_astro/dot-grid-claude.CyhSZsDE.css","/favicon.svg","/_astro/client.BPIbHqJh.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.D98dxaWf.js","/_astro/dot-grid-claude.astro_astro_type_script_index_0_lang.C6-4HUh2.js","/_astro/dot-grid-to-font.astro_astro_type_script_index_0_lang.CGu_tXdO.js","/_astro/dot-grid.astro_astro_type_script_index_0_lang.CF6aBMDw.js","/_astro/index.BVOCwoKb.js","/_astro/MatrixPanel.FXp696lA.js","/_astro/matrixState.DeZ8y74b.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"UQFrsA5U8EKcS7u87JzBcXAxD4bPlRCfA66rL/grSzs="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
