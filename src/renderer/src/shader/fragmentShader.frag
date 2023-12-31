
precision highp float;

// ==============
// === WINDOW ===
// ==============

uniform vec2 res;
uniform float aspect;
uniform float zoom;
uniform vec2 offset;
uniform int color_scheme;

// ======================
// === GUI PARAMETERS ===
// ======================

uniform float a;
uniform float b;
uniform float c;
uniform float d;
uniform float e;
uniform float f;

// =================================
// === COMPLEX NUMBER OPERATIONS ===
// =================================

vec2 cm (vec2 a, vec2 b) {
  return vec2(a.x*b.x - a.y*b.y, a.x*b.y + b.x*a.y);
}

vec2 conj (vec2 a) {
  return vec2(a.x, -a.y);
}

// =====================
// === COLOR SCHEMES ===
// =====================

vec4 basic_colormap(float s, vec3 shade) {
  vec3 coord = vec3(s, s, s);

  return vec4(pow(coord, shade), 1.0);
}

vec4 custom_colormap_1(float s) {
  vec3 color_1 = vec3(0.22, 0.07, 0.08);
  vec3 color_2 = vec3(0.29, 0.08, 0.08);
  vec3 color_3 = vec3(0.49, 0.11, 0.09);
  vec3 color_4 = vec3(0.66, 0.26, 0.14);
  vec3 color_5 = vec3(0.78, 0.47, 0.24);
  vec3 color_6 = vec3(0.87, 0.72, 0.39);
  vec3 color_7 = vec3(0.9, 0.87, 0.55);
  vec3 color_8 = vec3(0.85, 0.96, 0.67);

  vec3 color;

  if (s < 0.143) {
    float x = 7.0 * s;
    color = (1.0 - x) * color_1 + x * color_2;
  }
  else if (s < 0.286) {
    float x = 7.0 * (s - 0.143);
    color = (1.0 - x) * color_2 + x * color_3;
  }
  else if (s < 0.423) {
    float x = 7.0 * (s - 0.286);
    color = (1.0 - x) * color_3 + x * color_4;
  }
  else if (s < 0.571) {
    float x = 7.0 * (s - 0.423);
    color = (1.0 - x) * color_4 + x * color_5;
  }
  else if (s < 0.714) {
    float x = 7.0 * (s - 0.571);
    color = (1.0 - x) * color_5 + x * color_6;
  }
  else if (s < 0.857) {
    float x = 7.0 * (s - 0.714);
    color = (1.0 - x) * color_6 + x * color_7;
  }
  else {
    float x = 7.0 * (s - 0.857);
    color = (1.0 - x) * color_7 + x * color_8;
  }

  return vec4(color, 1.0);
}

vec4 custom_colormap_2(float s) {
  vec3 color_1 = vec3(0.04, 0.08, 0.09);
  vec3 color_2 = vec3(0.06, 0.26, 0.33);
  vec3 color_3 = vec3(0.14, 0.35, 0.61);
  vec3 color_4 = vec3(0.30, 0.37, 0.80);
  vec3 color_5 = vec3(0.43, 0.40, 0.86);
  vec3 color_6 = vec3(0.55, 0.44, 0.91);
  vec3 color_7 = vec3(0.78, 0.56, 0.96);
  vec3 color_8 = vec3(0.97, 0.86, 0.98);

  vec3 color;

  if (s < 0.143) {
    float x = 7.0 * s;
    color = (1.0 - x) * color_1 + x * color_2;
  }
  else if (s < 0.286) {
    float x = 7.0 * (s - 0.143);
    color = (1.0 - x) * color_2 + x * color_3;
  }
  else if (s < 0.423) {
    float x = 7.0 * (s - 0.286);
    color = (1.0 - x) * color_3 + x * color_4;
  }
  else if (s < 0.571) {
    float x = 7.0 * (s - 0.423);
    color = (1.0 - x) * color_4 + x * color_5;
  }
  else if (s < 0.714) {
    float x = 7.0 * (s - 0.571);
    color = (1.0 - x) * color_5 + x * color_6;
  }
  else if (s < 0.857) {
    float x = 7.0 * (s - 0.714);
    color = (1.0 - x) * color_6 + x * color_7;
  }
  else {
    float x = 7.0 * (s - 0.857);
    color = (1.0 - x) * color_7 + x * color_8;
  }

  return vec4(color, 1.0);
}

vec4 custom_colormap_3(float s) {
  vec3 color_1 = vec3(0.27, 0.0, 0.19);
  vec3 color_2 = vec3(0.43, 0.02, 0.45);
  vec3 color_3 = vec3(0.55, 0.06, 0.7);
  vec3 color_4 = vec3(0.65, 0.16, 0.93);
  vec3 color_5 = vec3(0.68, 0.42, 0.98);
  vec3 color_6 = vec3(0.73, 0.61, 0.99);
  vec3 color_7 = vec3(0.77, 0.81, 0.96);
  vec3 color_8 = vec3(0.92, 0.91, 1.0);

  vec3 color;

  if (s < 0.143) {
    float x = 7.0 * s;
    color = (1.0 - x) * color_1 + x * color_2;
  }
  else if (s < 0.286) {
    float x = 7.0 * (s - 0.143);
    color = (1.0 - x) * color_2 + x * color_3;
  }
  else if (s < 0.423) {
    float x = 7.0 * (s - 0.286);
    color = (1.0 - x) * color_3 + x * color_4;
  }
  else if (s < 0.571) {
    float x = 7.0 * (s - 0.423);
    color = (1.0 - x) * color_4 + x * color_5;
  }
  else if (s < 0.714) {
    float x = 7.0 * (s - 0.571);
    color = (1.0 - x) * color_5 + x * color_6;
  }
  else if (s < 0.857) {
    float x = 7.0 * (s - 0.714);
    color = (1.0 - x) * color_6 + x * color_7;
  }
  else {
    float x = 7.0 * (s - 0.857);
    color = (1.0 - x) * color_7 + x * color_8;
  }

  return vec4(color, 1.0);
}

// ============
// === MAIN ===
// ============

float mandelbrot(vec2 point){
    float alpha = 1.0;
    vec2 z = vec2(0.0, 0.0);
    vec2 z_0;
    vec2 z_1;

    // i < max iterations
    for (int i=0; i < 200; i++){
        z_1 = z_0;
        z_0 = z;

        // ===============================
        // =========== CACHING ===========
        // ===============================
        float x_0_sq = z_0.x*z_0.x;
        float y_0_sq = z_0.y*z_0.y;
        vec2 z_0_sq = vec2(x_0_sq - y_0_sq, 2.0*z_0.x*z_0.y);
        vec2 z_0_conj = conj(z_0);
        
        float x_1_sq = z_1.x*z_1.x;
        float y_1_sq = z_1.y*z_1.y;
        vec2 z_1_sq = vec2(x_1_sq - y_1_sq, 2.0*z_1.x*z_1.y);
        vec2 z_1_conj = conj(z_1);
        
        // ===============================
        // ===== RECURRENCE RELATION =====
        // ===============================
        z = z_0_sq + point;
        z = z + a * z_0_conj + b * z_1_conj + c * z_0_sq * z_1;
        z = z + d * cm(z_0_sq, z_0) + e * cm(z_0, z_1_conj) + f * cm(z_0_sq, z_1);

        //z = z + a * z_1 * x_0_sq + b * z_0 * x_1_sq + c * cm(z_0_sq, z_1) + d * cm(z_0, z_1_conj);
        //z = z + a * z_1_conj + b * cm(z_1, z_0) + c * z_0_sq * z_1 + d * z_0 * z_1_conj;
        //z = z + a * z_0_conj + b * z_1_conj + c * cm(z_1, z_0) + d * z_0_sq * z_1;
        //z = z + a * z_0_conj + b * cm(z_0_sq, z_0_conj) + c * cm(z_0_conj, z_0_conj) + d * cm(z_0_sq, z_0);

        float z_0_mag = x_0_sq + y_0_sq;
        float z_1_mag = x_1_sq + y_1_sq;

        if(z_0_mag > 15.0){
            float frac = (12.0 - z_1_mag) / (z_0_mag - z_1_mag);
            alpha = (float(i) - 1.0 + frac)/200.0; // should be same as max iterations
            break;
        }
    }

    // in interval [0, 1]
    return alpha;
}

// gl_FragCoord in [0,1]
void main(){
    vec2 uv = zoom * vec2(aspect, 1.0) * gl_FragCoord.xy / res + offset;
    float s = 1.0 - mandelbrot(uv);

    if (color_scheme == 0) {
      vec3 shade = vec3(5.38, 6.15, 3.85);
      gl_FragColor = basic_colormap(s, shade);
    }
    else if (color_scheme == 1) {
      vec3 shade = vec3(7.0, 3.0, 2.0);
      gl_FragColor = basic_colormap(s, shade);
    }
    else if (color_scheme == 2) {
      gl_FragColor = custom_colormap_1(pow(s, 6.0));
    }
    else if (color_scheme == 3) {
      gl_FragColor = custom_colormap_2(pow(s, 6.0));
    }
    else {
      gl_FragColor = custom_colormap_3(pow(s, 6.0));
    }
}
// ``#define N 64.
// #define B 32.
// #define SS 4.

// float random (in vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12454.1,78345.2))) * 43758.5);
// }

// vec2 random2(in vec2 st) {
//     return vec2(random(st), random(st));
// }

// vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
//     return a + b*cos(6.28318 * (c*t + d));
// }

// float iterate(vec2 p) {

//     vec2 z = vec2(0), c = p;
//     float i;

//     for(i=0.; i < N; i++) {
//         z = mat2(z, -z.y, z.x) * z + c;
//         if(dot(z, z) > B*B) break;
//     }

//     return i - log(log(dot(z, z)) / log(B)) / log(2.);;
// }

// void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

//     vec2 R = iResolution.xy;

//     vec3 col = vec3(0);
//     for(float i=0.; i < SS; i++) {

//         vec2 uv = (2. * fragCoord + random2(R+i) - R) / R.y ;

//         float sn = iterate(uv) / N;

//         col += pal(fract(2.*sn + 0.5), vec3(.5), vec3(0.5),
//                    vec3(1.0,1.0,1.0), vec3(.0, .10, .2));
//     }

//     fragColor = vec4(col / SS, 1.0);
// }
// `
