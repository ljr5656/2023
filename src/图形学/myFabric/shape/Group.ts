import { EFabrictObjecType } from '../type';
import { FabricObject } from './FabricObject';
import { Rect } from './Rect';

export class Group extends Rect {
  public type: EFabrictObjecType = EFabrictObjecType.Group;
  public objects: FabricObject[] = [];
  constructor(objects: FabricObject[] = [], options: any = {}) {
    super(options);
    this.objects = objects;
    this.stroke = 'blue';
    this.fill = 'rgba(0,0,255,0.1)';
  }

  add(object: FabricObject) {}

  remove(object: FabricObject) {}
}
