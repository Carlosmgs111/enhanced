declare module "intersection-observer";
declare module "react-gridstack";
declare module "*.module.css";
declare module "pdf-extraction";
declare module "react-split-pane@next";
declare module "@react-pdf-viewer/core";
declare module "@hapi/boom";
declare module "mongoose";
declare module "fast-deep-equal";
declare module "flatted";
declare module "uuid";
declare module "mogo";
declare module "github-api";
interface FilePickerAcceptType {
  description?: string;
  accept: Record<string, string[]>;
}

interface SaveFilePickerOptions {
  suggestedName?: string;
  types?: FilePickerAcceptType[];
  excludeAcceptAllOption?: boolean;
}

interface FileSystemWritableFileStream extends WritableStream {
  write(data: Blob | BufferSource | string): Promise<void>;
  close(): Promise<void>;
}

interface FileSystemFileHandle {
  createWritable: () => Promise<FileSystemWritableFileStream>;
}

interface Window {
  showSaveFilePicker?: (
    options?: SaveFilePickerOptions
  ) => Promise<FileSystemFileHandle>;
}
