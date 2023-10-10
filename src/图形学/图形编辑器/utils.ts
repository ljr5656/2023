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

  /**保留两位小数
   * 如果是 0，丢弃 0
   */
  static remainDecimals(num: number, decimals: number = 2) {
    return Number(num.toFixed(decimals));
  }

  static getDevicePixelRatio() {
    return window.devicePixelRatio || 1;
  }

  static viewportCoordsToSceneUtil(
    x: number,
    y: number,
    zoom: number,
    scrollX: number,
    scrollY: number,
    round = false,
  ) {
    let newX = scrollX + x / zoom;
    let newY = scrollY + y / zoom;
    if (round) {
      newX = Math.round(newX);
      newY = Math.round(newY);
    }
    return {
      x: newX,
      y: newY,
    };
  }

  static sceneCoordsToViewportUtil(
    x: number,
    y: number,
    zoom: number,
    scrollX: number,
    scrollY: number,
  ) {
    return {
      x: (x - scrollX) * zoom,
      y: (y - scrollY) * zoom,
    };
  }
}
