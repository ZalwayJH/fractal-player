uniform float iTime;
uniform vec2 iResolution;
uniform float iFrequency[512];
varying vec2 vUv;
varying float x;

// idea for freq, split the value into 2 or 3 variables depending on the intensity of signal ie. how big or small the number is.
                  vec3 palette( float t ) {
                      vec3 a = vec3(0.5, 0.5, 0.5);
                      vec3 b = vec3(0.5, 0.5, 0.5);
                      vec3 c = vec3(1.0, 1.0, 1.0);
                      vec3 d = vec3(0.263,0.416,0.557);
                      return a + b*cos( 6.28318  *(c*t+d) );
                  }

                  void main() {


                      vec2 fragCoord = vUv * iResolution;
                      vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
                      vec2 uv0 = uv;
                      vec3 finalColor = vec3(0.0);
                      float freq = iFrequency[9] > 2. ? iFrequency[1] / 2. : 8.;
                     //float num = iFrequency.x / iFrequency.y;
                    //float funk = iFrequency.x * 2. <= 8. ? 8. : iFrequency.x;
                      for (float i = 0.0; i < 4.0; i++) {
                          uv = fract(uv * 1.5) - 0.5;
                          float d = length(uv) * exp(-length(uv0));
                          vec3 col = palette(length(uv0) + i*.4 + iTime*.4);
                          d = sin(d*8.0 + iTime )/freq;
                          d = abs(d);
                          d = pow(0.01 / d,  1.2);
                          finalColor += col * d;
                      }
                      gl_FragColor = vec4(finalColor, 1.0);
                  }

