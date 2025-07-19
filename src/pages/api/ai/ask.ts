import type { APIContext } from "astro";
import { AgentUseCases } from "../../../../backend/modules/AI/application/AgentUseCases";
import { ReadableStreamService } from "../../../../backend/modules/AI/infrastructure/services/ReadableStreamService";

let message: string = "";
const agentUseCases = new AgentUseCases();

export async function POST({ request }: APIContext) {
  try {
    const { message } = await request.json();
    console.log({ message });
    const response = await agentUseCases.askToAgent(
      "4b2dd990-284a-4efe-afd5-ffa9ac65430c",
      message
    );
    return new Response(
      JSON.stringify({ message: "OK", status: 200, response })
    );
  } catch (error: any) {
    console.error("Error in POST request:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET({ request }: APIContext) {
  try {
      // const { message } = await request.json();
    const stream = new ReadableStream({
      async start(controller) {
        await agentUseCases.getResponseFromAgent(
          "4b2dd990-284a-4efe-afd5-ffa9ac65430c",
          // message,
          (data: string) => {
            controller.enqueue(`data: ${JSON.stringify({ data: data })}\n\n`);
          }
        );
        console.log("Stream closed");
        controller.close();
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
    console.error("Error in POST request:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
