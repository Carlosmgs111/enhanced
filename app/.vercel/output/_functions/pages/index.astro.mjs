/* empty css                                           */
import { c as createComponent, m as maybeRenderHead, b as renderScript, a as renderTemplate, r as renderComponent, d as createAstro, g as renderSlot, e as addAttribute } from '../chunks/astro/server_BxFtCGAt.mjs';
import { $ as $$Layout } from '../chunks/Layout_Dmv-XmFs.mjs';
export { renderers } from '../renderers.mjs';

const $$Chat = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="w-[600px] h-[300px] flex flex-col"> <article id="response" class="w-full h-full border border-black overflow-scroll"></article> <form class="flex flex-col gap-2"> <input class="border border-black" type="text" value="Hola, como estas?"><button>Enviar</button> </form> </section> ${renderScript($$result, "D:/Documentos/Desktop/enhanced/app/src/components/Chat.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Documentos/Desktop/enhanced/app/src/components/Chat.astro", void 0);

const $$Welcome = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col items-center justify-center"> <div> ${renderComponent($$result, "Chat", $$Chat, {})} </div> </div>`;
}, "D:/Documentos/Desktop/enhanced/app/src/components/Welcome.astro", void 0);

const $$Astro = createAstro();
const $$ElementWrapper = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ElementWrapper;
  const { size = 6 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="text-3xl italic font-[200] w-fit relative"> ${renderSlot($$result, $$slots["default"])} <span${addAttribute(`absolute top-0 left-0 w-[${size}px] h-[${size}px] border-t-[1px] border-l-[1px] border-gray-400`, "class")}></span> <span${addAttribute(`absolute top-0 right-0 w-[${size}px] h-[${size}px] border-t-[1px] border-r-[1px] border-gray-400`, "class")}></span> <span${addAttribute(`absolute bottom-0 right-0 w-[${size}px] h-[${size}px] border-b-[1px] border-r-[1px] border-gray-400`, "class")}></span> <span${addAttribute(`absolute bottom-0 left-0 w-[${size}px] h-[${size}px] border-b-[1px] border-l-[1px] border-gray-400`, "class")}></span> </div>`;
}, "D:/Documentos/Desktop/enhanced/app/src/components/ElementWrapper.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-6"> ${renderComponent($$result2, "ElementWrapper", $$ElementWrapper, {}, { "default": ($$result3) => renderTemplate`<div class="p-2"> ${renderComponent($$result3, "ElementWrapper", $$ElementWrapper, {}, { "default": ($$result4) => renderTemplate`<p class="p-2">Enhanced</p>` })} </div>` })} <h2 class="text-2xl italic font-[200] p-1 400 w-fit relative"> ${renderComponent($$result2, "ElementWrapper", $$ElementWrapper, {}, { "default": ($$result3) => renderTemplate` <div class="p-4 grid grid-cols-3 gap-2"> <div> ${renderComponent($$result3, "ElementWrapper", $$ElementWrapper, {}, { "default": ($$result4) => renderTemplate` <p class="p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition-all duration-200 ease-in-out cursor-pointer">
1
</p>` })} </div> <div> ${renderComponent($$result3, "ElementWrapper", $$ElementWrapper, {}, { "default": ($$result4) => renderTemplate` <p class="p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition-all duration-200 ease-in-out cursor-pointer">
2
</p>` })} </div> <div> ${renderComponent($$result3, "ElementWrapper", $$ElementWrapper, {}, { "default": ($$result4) => renderTemplate` <p class="p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition-all duration-200 ease-in-out cursor-pointer">
3
</p>` })} </div> <div> ${renderComponent($$result3, "ElementWrapper", $$ElementWrapper, {}, { "default": ($$result4) => renderTemplate` <p class="p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition-all duration-200 ease-in-out cursor-pointer">
4
</p>` })} </div> <div> ${renderComponent($$result3, "ElementWrapper", $$ElementWrapper, {}, { "default": ($$result4) => renderTemplate` <p class="p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition-all duration-200 ease-in-out cursor-pointer">
5
</p>` })} </div> <div> ${renderComponent($$result3, "ElementWrapper", $$ElementWrapper, {}, { "default": ($$result4) => renderTemplate` <p class="p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition-all duration-200 ease-in-out cursor-pointer">
6
</p>` })} </div> <div> ${renderComponent($$result3, "ElementWrapper", $$ElementWrapper, {}, { "default": ($$result4) => renderTemplate` <p class="p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition-all duration-200 ease-in-out cursor-pointer">
7
</p>` })} </div> <div> ${renderComponent($$result3, "ElementWrapper", $$ElementWrapper, {}, { "default": ($$result4) => renderTemplate` <p class="p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition-all duration-200 ease-in-out cursor-pointer">
8
</p>` })} </div> <div> ${renderComponent($$result3, "ElementWrapper", $$ElementWrapper, {}, { "default": ($$result4) => renderTemplate` <p class="p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition-all duration-200 ease-in-out cursor-pointer">
9
</p>` })} </div> <!-- <span
          class="absolute -bottom-2 left-0 w-full h-0 border-b-[1px] border-gray-400"
        ></span>
        <span
          class="absolute -top-2 left-0 w-full h-0 border-t-[1px] border-gray-400"
        ></span>
        <span
          class="absolute top-0 -left-2 w-0 h-full border-l-[1px] border-gray-400"
        ></span>
        <span
          class="absolute bottom-0 -right-2 w-0 h-full border-l-[1px] border-gray-400"
        ></span> --> </div> ` })} </h2> </div> ${renderComponent($$result2, "Welcome", $$Welcome, {})} ` })}`;
}, "D:/Documentos/Desktop/enhanced/app/src/pages/index.astro", void 0);

const $$file = "D:/Documentos/Desktop/enhanced/app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
