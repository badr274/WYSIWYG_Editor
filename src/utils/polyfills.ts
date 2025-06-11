/* eslint-disable @typescript-eslint/no-explicit-any */
// 🛠 Polyfill for setImmediate (draft-js needs it)
if (typeof (window as any).setImmediate === "undefined") {
  (window as any).setImmediate = (
    fn: (...args: any[]) => void,
    ...args: any[]
  ) => setTimeout(() => fn(...args), 0);
}

// 🛠 Polyfill for global (draft-js uses fbjs which assumes Node.js)
(window as any).global = window;
