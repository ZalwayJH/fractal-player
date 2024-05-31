import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { KernelSize, Resolution } from 'postprocessing';
import { MathUtils } from 'three';
import orbFrag from '../shader/orbFrag.frag?raw';
import orbVert from '../shader/orbVert.vert?raw';
// import fractalFrag from '../shader/fractalFrag.frag?raw';
// import fractalVert from '../shader/fractalVert.vert?raw';
import Fractal from './Fractal';

function Scene() {
  return (
    <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
      <Fractal />
    </Canvas>
  );
}

export default Scene;
