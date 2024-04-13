import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import fractalFrag from '../shader/fractalFrag.frag?raw';
import fractalVert from '../shader/fractalVert.vert?raw';

export default function Fractal() {
  const materialRef = useRef();
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: [viewport.width, viewport.height] }
    }),
    []
  );

  // Update uniforms on each frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.iTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.iResolution.value = [viewport.width, viewport.height];
    }
  });

  return (
    <mesh position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <shaderMaterial
        ref={materialRef}
        vertexShader={fractalVert}
        fragmentShader={fractalFrag}
        uniforms={uniforms}
      />
    </mesh>
  );
}
