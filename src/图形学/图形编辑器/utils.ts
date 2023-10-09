export class Utils {
  static setOptions<T extends Object>(instance, options: T) {
    for (let [key, value] of Object.entries(options)) {
      instance[key] = value;
    }
  }

  /**
   * 节流 + raf
   */
  static rafThrottle = (callback: (...args: any) => void) => {
    let requestId: number | undefined;

    const throttled = function (...args: unknown[]) {
      if (requestId === undefined) {
        requestId = requestAnimationFrame(() => {
          requestId = undefined;
          callback(args);
        });
      }
    };

    throttled.cancel = () => {
      if (requestId !== undefined) {
        cancelAnimationFrame(requestId);
      }
      requestId = undefined;
    };

    return throttled;
  };
}
