void mainImage(out vec4 fragColor,in vec2 fragCoord){
  vec2 uv=fragCoord/iResolution.xy;// 归一化
  fragColor=vec4(uv.x,0.,0.,1.);
  fragColor=vec4(0,uv.y,0.,1.);
  fragColor=vec4(uv,0.,1.);
}