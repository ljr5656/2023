import { EFabrictObjecType } from '../type';

export class FabricObject {
  public type: string = EFabrictObjecType.FabricObject;
  public visible: boolean = true;
  public active: boolean = false;
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public scaleX: number = 1;
  public scaleY: number = 1;
  public rotateAngle: number = 0;
}
