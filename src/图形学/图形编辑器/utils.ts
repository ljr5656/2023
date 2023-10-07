export class Utils {
  static setOptions<T extends Object>(instance, options: T) {
    for(let [key, value] of Object.entries(options)) {
      instance[key] = value;
    }
  }
}