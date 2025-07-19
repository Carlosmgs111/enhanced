import type { APIContext } from "astro";
import { ChatAgent } from "../../../../backend/modules/AI";

const chatAgent = ChatAgent.getInstance();

export async function POST({ request }: APIContext) {
  try {
    const { message } = await request.json();
    const response = await chatAgent.askAI(message);  
    return new Response(JSON.stringify({ message, response }));
  } catch (error: any) {
    console.error("Error in POST request:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET({ request }: APIContext) {
  try {
    let response = "";
    const chatAgent = ChatAgent.getInstance();
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
  } catch (error: any) {
    console.error("Error in GET request:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
