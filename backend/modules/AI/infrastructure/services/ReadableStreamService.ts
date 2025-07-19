import type { StreamingService } from "../../@core-contracts/application/services";

export class ReadableStreamService implements StreamingService {
  streams: Record<string, ReadableStream> = {};
  constructor() {}
  createStream = (id: string, onData: (cb: (data: string) => void) => void) => {
    this.streams[id] = new ReadableStream({
      start(controller) {
        onData((data: string) => {
          controller.enqueue(`data: ${JSON.stringify({ data: data })}\n\n`);
        });
        // controller.close();
      },
    });
  };
  onStream(data: string): ReadableStream {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(`data: ${JSON.stringify({ data: data })}\n\n`);
        // controller.close();
      },
    });
    return stream;
  }
  getStream = (id: string): ReadableStream => {
    return this.streams[id];
  };
}
