import { useMemo, useRef, Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { KernelSize, Resolution } from 'postprocessing';
import { MathUtils } from 'three';
import orbFrag from '../shader/orbFrag.frag?raw';
import orbVert from '../shader/orbVert.vert?raw';
import fractalFrag from '../shader/fractalFrag.frag?raw';
import fractalVert from '../shader/fractalVert.vert?raw';

const Fractal = () => {
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
};

const Orb = () => {
  const mesh = useRef();
  const hover = useRef(false);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      u_intensity: { value: 0.3 },
      u_time: { value: 0.0 },
      iResolution: { value: [viewport.width, viewport.height] }
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
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
};

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
