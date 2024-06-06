import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import fractalFrag from '../../shader/fractalFrag.frag?raw';
import fractalVert from '../../shader/fractalVert.vert?raw';
import { MathUtils } from 'three';

export default function Fractal({ musicData }) {
  const materialRef = useRef();
  const { viewport } = useThree();
  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: [viewport.width, viewport.height] },
      iFrequency: { value: [0.0, 8.0] }
    }),
    []
  );

  // Update uniforms on each frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      // figure out a way to use MathUtils (maybe lerp) to transition a value from between less than 8.0 and 10.0

      const averagedMusicData = musicData.reduce((sum, value) => sum + value, 0);
      const frequency = MathUtils.lerp(averagedMusicData / 16.0, 8.0, 0.05);

      // console.log(frequency);
      materialRef.current.uniforms.iTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.iResolution.value = [viewport.width, viewport.height];
      materialRef.current.uniforms.iFrequency.value = frequency;
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
