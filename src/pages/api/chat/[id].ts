import type { APIContext } from "astro";

export async function POST({ params, request }: APIContext) {
  const { chatUseCases } = await import("../../../../backend/modules/chat");
  try {
    const { id } = params;
    const { message, chat } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "Chat ID is required" }));
    }
    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }));
    }
    await chatUseCases.createNewChat({ id, ...chat }, message);
    return new Response(JSON.stringify({ id, message }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
export async function PATCH({ params, request }: APIContext) {
  const { chatUseCases } = await import("../../../../backend/modules/chat");
  try {
    const { id } = params;
    const { message } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "Chat ID is required" }));
    }
    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }));
    }
    const result = await chatUseCases.query(id as string, message);
    return new Response(JSON.stringify({ id, result }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET({ params }: APIContext) {
  const { chatUseCases } = await import("../../../../backend/modules/chat");
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "Chat ID is required" }));
    }
    const stream = new ReadableStream({
      async start(controller) {
        const isDone = await chatUseCases.response(
          id as string,
          (data: string) => {
            controller.enqueue(`data: ${JSON.stringify({ data: data })}\n\n`);
          }
        );
        if (isDone) {
          console.log("Stream closed");
          controller.close();
        }
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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
