import { Canvas } from '../src/Canvas';
import { Rect } from '../src/Rect';

const body = document.body;
const canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.width = 600;
canvas.height = 600;
body.innerHTML = '';
body.appendChild(canvas);

const myFarbic = new Canvas(canvas, {
  width: 1000,
  height: 1000,
});

const rect2 = new Rect({
  top: 100,
  left: 100,
  width: 100,
  height: 100,
  stroke: 'red',
  fill: 'white',
  scaleX: 2,
  scaleY: 2,
});
myFarbic.add(rect2);

const rect = new Rect({
  top: 100,
  left: 100,
  width: 100,
  height: 100,
  stroke: 'black',
  fill: 'white',
});

myFarbic.add(rect);
