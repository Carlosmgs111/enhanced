import { c as createComponent, d as createAstro, e as addAttribute, b as renderScript, a as renderTemplate, r as renderComponent, f as renderHead, g as renderSlot } from './astro/server_BxFtCGAt.mjs';
/* empty css                                   */

const $$Astro$1 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "D:/Documentos/Desktop/enhanced/app/node_modules/.pnpm/astro@5.11.1_typescript@5.8.3/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Documentos/Desktop/enhanced/app/node_modules/.pnpm/astro@5.11.1_typescript@5.8.3/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const path = Astro2.url.pathname;
  console.log(path);
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro Basics</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body class="p-4" data-astro-cid-sckkx6r4> <ul class="list-disc list-inside pb-8" data-astro-cid-sckkx6r4> <li data-astro-cid-sckkx6r4><a class="underline" href="/" data-astro-cid-sckkx6r4>main</a></li> <li data-astro-cid-sckkx6r4><a class="underline" href="/UI-design/dot-grid" data-astro-cid-sckkx6r4>dot-grid</a></li> <li data-astro-cid-sckkx6r4> <a class="underline" href="/UI-design/dot-grid-to-font" data-astro-cid-sckkx6r4>dot-grid-to-font</a> </li> <li data-astro-cid-sckkx6r4> <a class="underline" href="/UI-design/dot-grid-claude" data-astro-cid-sckkx6r4>dot-grid-claude</a> </li> </ul> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "D:/Documentos/Desktop/enhanced/app/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
