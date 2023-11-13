void mainImage(out vec4 fragColor,in vec2 fragCoord){
  vec2 uv=fragCoord/iResolution.xy;// 归一化
  
  uv=(uv-.5)*2.;// 居中
  uv.y*=iResolution.y/iResolution.x;
  float d=length(uv);// uv道原点的距离
  // d-=.5;
  
  // fragColor=vec4(vec3(d),1.);
  float c=step(.5,d);
  fragColor=vec4(vec3(c),1.);
  
  c=smoothstep(0.,.02,d);
  fragColor=vec4(vec3(c),1.);
  
  c=.25/d;
  c=pow(c,1.6);
  fragColor=vec4(vec3(c),1.);
}