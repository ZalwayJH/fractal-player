// const Orb = () => {
//   const mesh = useRef();
//   const hover = useRef(false);
//   const { viewport } = useThree();

//   const uniforms = useMemo(
//     () => ({
//       u_intensity: { value: 0.1 },
//       u_time: { value: 0.0 },
//       iResolution: { value: [viewport.width, viewport.height] }
//     }),
//     []
//   );

//   useFrame((state) => {
//     const { clock } = state;
//     mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
//     mesh.current.material.uniforms.iResolution.value = [viewport.width, viewport.height];
//     mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
//       mesh.current.material.uniforms.u_intensity.value,
//       hover.current ? 0.85 : 0.15,
//       0.02
//     );
//     mesh.current.rotation.y += 0.01;
//   });

//   return (
//     <mesh
//       ref={mesh}
//       position={[0, 0, 0]}
//       scale={1.5}
//       rotation={[0.1, Math.PI * 0.002, 0]}
//       onPointerOver={() => (hover.current = true)}
//       onPointerOut={() => (hover.current = false)}
//     >
//       <icosahedronGeometry args={[2, 20]} />
//       <shaderMaterial
//         fragmentShader={orbFrag}
//         vertexShader={orbVert}
//         uniforms={uniforms}
//         wireframe={false}
//       />
//     </mesh>
//   );
// };
