import { Canvas } from '../Canvas';

const body = document.body;
const container = document.createElement('div');
body.appendChild(container);
const fabric = new Canvas(container, {
  width: 800,
  height: 800,
});
