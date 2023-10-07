export function createShader(gl: WebGLRenderingContext, type, source: string) {
  const shader = gl.createShader(type);
  if (shader === null) {
    throw new Error('shader = null');
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!success) {
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return;
  }

  return shader;
}

export function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader,
  fragmentShader,
) {
  const program = gl.createProgram();
  if (program === null) {
    throw new Error('program');
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);
  gl.useProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return;
  }

  return program;
}
