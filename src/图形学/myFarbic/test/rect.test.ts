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

const rect = new Rect({
  top: 10,
  left: 10,
  width: 100,
  height: 100,
  stroke: 'black',
  fill: 'white',
});

myFarbic.add(rect);
