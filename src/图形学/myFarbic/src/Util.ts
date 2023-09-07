export class Util {
  static addClass(el: HTMLElement, className: string | string[]) {
    if (typeof className === 'string') {
      el.classList.add(className);
    } else {
      className.forEach((item) => {
        el.classList.add(item);
      });
    }
  }
}
