export enum ECursor {
  DEFAULT = 'default',
  MOVE = 'move',
  CROSSHAIR = 'crosshair',
  POINTER = 'pointer',
}
export type ClassPropsToOptions<Class, Props extends keyof Class> = {
  [key in Props]: Partial<Class[key]>;
};

export enum EFabrictObjecType {
  FabricObject = 'object',
  Rect = 'rect',
  Image = 'image',
  Ellipse = 'ellipse',
  Group = 'group',
}
