import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_ENvCj6XL.mjs';
import { manifest } from './manifest_CbiHSWUt.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/stream/_sessionid_.astro.mjs');
const _page2 = () => import('./pages/api.astro.mjs');
const _page3 = () => import('./pages/ui-design/dot-grid.astro.mjs');
const _page4 = () => import('./pages/ui-design/dot-grid-claude.astro.mjs');
const _page5 = () => import('./pages/ui-design/dot-grid-to-font.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.11.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/stream/[sessionId].ts", _page1],
    ["src/pages/api/index.ts", _page2],
    ["src/pages/UI-design/dot-grid.astro", _page3],
    ["src/pages/UI-design/dot-grid-claude.astro", _page4],
    ["src/pages/UI-design/dot-grid-to-font.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "61b70efe-2900-4eec-9e47-5507768ee2bb",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
