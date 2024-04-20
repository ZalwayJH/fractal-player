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
      {/* <Orb /> */}
      {/* <OrbitControls /> */}
      <Suspense fallback={null}>
        {/* <EffectComposer> */}
        {/* <Bloom
            intensity={0.001}
            kernelSize={KernelSize.HUGE}
            mipmapBlur={true}
            resolutionX={Resolution.AUTO_SIZE}
            resolutionY={Resolution.AUTO_SIZE}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.025}
          /> */}
        {/* <Noise opacity={0.01} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer> */}
      </Suspense>
    </Canvas>
  );
}

export default Scene;
