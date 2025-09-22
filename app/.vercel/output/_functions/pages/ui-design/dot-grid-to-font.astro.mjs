/* empty css                                              */
import { c as createComponent, r as renderComponent, b as renderScript, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BxFtCGAt.mjs';
import { $ as $$Layout } from '../../chunks/Layout_Dmv-XmFs.mjs';
export { renderers } from '../../renderers.mjs';

const $$DotGridToFont = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <h1>Dot Grid to Font</h1> <p>Convert a dot grid to a font</p> <div id="svg-container"></div> <div id="svg-container"></div> </div> ` })} ${renderScript($$result, "D:/Documentos/Desktop/enhanced/app/src/pages/UI-design/dot-grid-to-font.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Documentos/Desktop/enhanced/app/src/pages/UI-design/dot-grid-to-font.astro", void 0);

const $$file = "D:/Documentos/Desktop/enhanced/app/src/pages/UI-design/dot-grid-to-font.astro";
const $$url = "/UI-design/dot-grid-to-font";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DotGridToFont,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
