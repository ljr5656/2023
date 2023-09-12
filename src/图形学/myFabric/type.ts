export enum ECursor {
  DEFAULT = 'default',
  MOVE = 'move',
  CROSSHAIR = 'crosshair',
  POINTER = 'pointer',
}
export type ClassPropsToOptions<Class, Props extends keyof Class> = {
  [key in Props]: Class[key];
};
