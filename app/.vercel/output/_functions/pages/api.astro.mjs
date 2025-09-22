export { renderers } from '../renderers.mjs';

async function GET({ request }) {
  return new Response("Hello, world!");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
