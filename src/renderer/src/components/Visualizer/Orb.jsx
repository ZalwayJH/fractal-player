import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
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
    //console.log(musicData);
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
    mesh.current.material.uniforms.iResolution.value = [viewport.width, viewport.height];
    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      musicData[400] === 0 || musicData.length === 0 ? 0.15 : musicData[400] / 2.5,
      0.15,
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
