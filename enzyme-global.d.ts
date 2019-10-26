declare module '*.scss';

declare namespace NodeJS {
  interface Global {
    window: Window;
    document: Document;
    navigator: Partial<Navigator>;
    requestAnimationFrame: (callback: FrameRequestCallback) => number;
    cancelAnimationFrame: (handle: number) => void;
  }
}
