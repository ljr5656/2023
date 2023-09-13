import { Canvas } from '../Canvas';
import { Rect } from '../shape/Rect';

const body = document.body;
const container = document.createElement('div');
body.appendChild(container);
const fabric = new Canvas(container, {
  width: 800,
  height: 800,
});

const rect = new Rect({
  x: 200,
  y: 200,
  width: 200,
  height: 200,
  active: true,
  scaleX: 2,
  scaleY: 2,
});

fabric.add(rect);

// const rect2 = new Rect({
//   x: 250,
//   y: 250,
//   width: 100,
//   height: 100,
//   rx: 10,
//   ry: 10,
// });

// fabric.add(rect2);
