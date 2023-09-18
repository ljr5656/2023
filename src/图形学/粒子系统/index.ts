import { Particle } from './Particle';

// 获取Canvas元素和上下文
const canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 1000;
const ctx = canvas.getContext('2d')!;
document.body.appendChild(canvas);

const offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = offscreenCanvas.height = 1000;
const offscreenCtx = offscreenCanvas.getContext('2d')!;

const oFps = document.createElement('div');
oFps.innerHTML = '';
document.body.appendChild(oFps);
oFps.style.fontSize = '40px';

// 创建粒子数组
const particles: Particle[] = [];

// 生成粒子
const numberOfParticles = 10000;
for (let i = 0; i < numberOfParticles; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const vx = (Math.random() - 0.5) * 2 * 1; // 随机水平速度
  const vy = (Math.random() - 0.5) * 2 * 1; // 随机垂直速度
  const size = Math.random() * 5; // 随机大小
  const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  }, ${Math.random()})`; // 颜色

  particles.push(new Particle(x, y, vx, vy, size, color));
}

// 动画循环

let last = 0;
function animate(timescamp) {
  oFps.innerHTML = `${(1000 / (timescamp - last)).toFixed(0)}`;
  last = timescamp;

  // 不使用离屏canvas
  // ctx.clearRect(0, 0, 1000, 1000);

  // particles.forEach((particle) => {
  //   particle.update();
  //   particle.draw(ctx);
  // });

  // 使用离屏canvas
  ctx.clearRect(0, 0, 1000, 1000);
  ctx.drawImage(offscreenCanvas, 0, 0);
  offscreenCtx.clearRect(0, 0, 1000, 1000);

  particles.forEach((particle) => {
    particle.update();
    particle.draw(offscreenCtx);
  });

  requestAnimationFrame(animate);
}

animate(0);
