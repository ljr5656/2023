import { Canvas } from '../Canvas';
import { Ellipse } from '../shape/Ellipse';

const body = document.body;
const container = document.createElement('div');
body.appendChild(container);
const fabric = new Canvas(container, {
  width: 800,
  height: 800,
});

const ellipse1 = new Ellipse({
  x: 200,
  y: 200,
  width: 200,
  height: 200,
});

fabric.add(ellipse1);

const ellipse2 = new Ellipse({
  x: 0,
  y: 0,
  width: 200,
  height: 100,
});

fabric.add(ellipse2);
