import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import Fractal from './Fractal';

function Scene() {
  return (
    <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
      <Fractal />
    </Canvas>
  );
}

export default Scene;
