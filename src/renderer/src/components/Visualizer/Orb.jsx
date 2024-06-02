import React, { useRef, useMemo, Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { KernelSize, Resolution } from 'postprocessing';
import { MathUtils } from 'three';
import orbFrag from '../../shader/orbFrag.frag?raw';
import orbVert from '../../shader/orbVert.vert?raw';

export default function Orb({ musicData }) {
  const mesh = useRef();
  const hover = useRef(false);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      u_intensity: { value: 0.1 },
      u_time: { value: 0.0 },
      iResolution: { value: [viewport.width, viewport.height] }
    }),
    []
  );

  useFrame(({ clock }) => {
    const averagedMusicData = musicData.reduce((sum, value) => sum + value, 0);
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
    mesh.current.material.uniforms.iResolution.value = [viewport.width, viewport.height];
    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 0.85 : 0.15,
      0.02
    );
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1.5}
      rotation={[0.1, Math.PI * 0.002, 0]}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={orbFrag}
        vertexShader={orbVert}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}
