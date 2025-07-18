import type { APIContext } from "astro";
import { ChatAgent } from "../../../../backend/modules/AI";
const chatAgent = new ChatAgent();

export async function POST({ request }: APIContext) {
  const { message } = await request.json();
  chatAgent.askAI(message);
  return new Response(JSON.stringify({ message }));
}

export async function GET({ request }: APIContext) {
  let response = "";
  const stream = new ReadableStream({
    start(controller) {
      chatAgent.responseAI((chunk: string) => {
        response += chunk;
        console.log({ chunk });
        controller.enqueue(`data: ${JSON.stringify({ data: chunk })}\n\n`);
        console.log(response);
      });
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
