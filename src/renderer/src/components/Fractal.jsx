import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import fractalFrag from '../shader/fractalFrag.frag?raw';
import fractalVert from '../shader/fractalVert.vert?raw';

export default function Fractal({ musicData }) {
  const materialRef = useRef();
  const { viewport } = useThree();
  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: [viewport.width, viewport.height] },
      iFrequency: { value: 0 }
    }),
    []
  );

  // Update uniforms on each frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      console.log(musicData[0]);
      materialRef.current.uniforms.iTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.iResolution.value = [viewport.width, viewport.height];
      materialRef.current.uniforms.iFrequency.value = musicData[0];
      // for (let i = 0; i < 1024; i++) {
      // }
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
