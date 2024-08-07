import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import fractalFrag from '../../shader/fractalFrag.frag?raw';
import fractalVert from '../../shader/fractalVert.vert?raw';

export default function Fractal({ musicData }) {
  const materialRef = useRef();
  const { viewport } = useThree();
  const uniforms = useMemo(
    () => ({
      iTime: { type: 'f', value: 0.0 },
      iResolution: { value: [viewport.width, viewport.height] },
      iFrequency: { value: new Float32Array(512) }
    }),
    []
  );

  // Update uniforms on each frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.iTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.iResolution.value = [viewport.width, viewport.height];
      //pass the musicData to the glsl shader
      materialRef.current.uniforms.iFrequency.value.set(musicData);
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
