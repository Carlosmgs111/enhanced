export { renderers } from '../../../renderers.mjs';

const aiModel = {
  onChunk: (sessionId, callback) => {
    let chunkCount = 0;
    const interval = setInterval(() => {
      if (chunkCount < 100) {
        callback({ text: `AI chunk ${chunkCount}`, sessionId });
        chunkCount++;
      } else {
        clearInterval(interval);
      }
    }, 1e3);
  },
  onComplete: (sessionId, callback) => {
  },
  onError: (sessionId, callback) => {
  }
};
async function GET({ params }) {
  const { sessionId } = params;
  console.log("Session ID:", sessionId);
  if (!sessionId) {
    return new Response("Session ID is required", { status: 400 });
  }
  const stream = new ReadableStream({
    start(controller) {
      console.log("AI stream started for session:", sessionId);
      const sendChunk = (chunk) => {
        try {
          if (controller.desiredSize !== null) {
            controller.enqueue(`data: ${JSON.stringify(chunk)}

`);
          }
        } catch (error) {
          console.error("Error sending chunk:", error);
        }
      };
      aiModel.onChunk(sessionId, sendChunk);
      sendChunk({
        text: "AI model connected",
        timestamp: Date.now(),
        sessionId
      });
    },
    cancel() {
      console.log("AI stream cancelled for session:", sessionId);
    }
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
