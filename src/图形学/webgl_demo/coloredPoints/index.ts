import { createShader, createProgram } from '../utils';
import fSource from './fs.glsl';
import vSource from './vs.glsl';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 800;

const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;

const vs = createShader(gl, gl.VERTEX_SHADER, vSource);
const fs = createShader(gl, gl.FRAGMENT_SHADER, fSource);
const program = createProgram(gl, vs, fs);
const points: { x: number; y: number; color: number[]; pointSize: number }[] =
  [];
canvas.addEventListener(
  'click',
  (e: MouseEvent) => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (program) {
      const pointSize = Math.random() * 10;
      points.push({
        x: (e.clientX / canvas.width - 0.5) * 2,
        y: ((canvas.height - e.clientY) / canvas.height - 0.5) * 2,
        color: getRandomColor(),
        pointSize,
      });

      for (const { x, y, color, pointSize } of points) {
        const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
        gl.vertexAttrib3f(a_PointSize, x, y, 0.0);
        gl.vertexAttrib1f(a_PointSize, pointSize);
        const a_Position = gl.getAttribLocation(program, 'a_Position');
        gl.vertexAttrib3f(a_Position, x, y, 0.0);
        const col = gl.getUniformLocation(program, 'u_FragColor');
        gl.uniform4fv(col, color);

        gl.drawArrays(gl.POINTS, 0, 1);
      }
    }
  },
  false,
);
function getRandomColor() {
  return [Math.random(), Math.random(), Math.random(), 1.0];
}
