import type { APIContext } from "astro";
import { chatUseCases } from "../../../../backend/modules/chat";

export async function POST({ params, request }: APIContext) {
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
  try {
    const { id } = params;
    const { message } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "Chat ID is required" }));
    }
    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }));
    }
    await chatUseCases.appendMessageToChat(id as string, message);
    return new Response(JSON.stringify({ id, message }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
