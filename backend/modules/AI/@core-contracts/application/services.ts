export interface StreamingService {
  createStream(id: string, onData: (cb: (data: string) => void) => void): void;
  onStream(chunk: string): ReadableStream;
  getStream(id: string): ReadableStream;
}
