import type { APIContext } from "astro";

interface AIModelResponse {
  onChunk: (sessionId: string, callback: (chunk: any) => void) => void;
  onComplete: (sessionId: string, callback: () => void) => void;
  onError: (sessionId: string, callback: (error: any) => void) => void;
}

// Mock AI model - replace with your actual implementation
const aiModel: AIModelResponse = {
  onChunk: (sessionId, callback) => {
    // Mock implementation
    let chunkCount = 0;
    const interval = setInterval(() => {
      if (chunkCount < 100) {
        callback({ text: `AI chunk ${chunkCount}`, sessionId });
        chunkCount++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  },
  onComplete: (sessionId, callback) => {
    // setTimeout(callback, 5000); // Complete after 5 seconds
  },
  onError: (sessionId, callback) => {
    // Handle errors
  },
};

export async function GET({ params }: APIContext) {
  const { sessionId } = params;

  console.log("Session ID:", sessionId);

  if (!sessionId) {
    return new Response("Session ID is required", { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      console.log("AI stream started for session:", sessionId);

      const sendChunk = (chunk: any) => {
        try {
          if (controller.desiredSize !== null) {
            controller.enqueue(`data: ${JSON.stringify(chunk)}\n\n`);
          }
        } catch (error) {
          console.error("Error sending chunk:", error);
        }
      };

      const closeStream = () => {
        try {
          if (controller.desiredSize !== null) {
            controller.enqueue("data: [DONE]\n\n");
            controller.close();
          }
        } catch (error) {
          console.error("Error closing stream:", error);
        }
      };

      const handleError = (error: any) => {
        try {
          if (controller.desiredSize !== null) {
            controller.enqueue(
              `data: ${JSON.stringify({ error: error.message })}\n\n`
            );
            controller.close();
          }
        } catch (err) {
          console.error("Error handling error:", err);
        }
      };

      // Set up AI model event listeners
      aiModel.onChunk(sessionId as string, sendChunk);
      aiModel.onComplete(sessionId as string, closeStream);
      aiModel.onError(sessionId as string, handleError);

      // Send initial connection message
      sendChunk({
        text: "AI model connected",
        timestamp: Date.now(),
        sessionId,
      });
    },

    cancel() {
      console.log("AI stream cancelled for session:", sessionId);
      // Clean up AI model listeners if needed
      // aiModel.removeListeners(sessionId);
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
