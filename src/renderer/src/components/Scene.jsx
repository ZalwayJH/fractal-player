import React, { useRef, useMemo } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import fragmentShader from '../shader/fragmentShader.frag?raw'
import vertexShader from '../shader/vertexShader?raw'

function Scene() {
  return (
    <group>
      <Model />
      <fractalShaderMaterial />
    </group>
  )
}

function Model() {
  const mesh = useRef()
  return (
    <mesh ref={mesh}>
      <planeGeometry args={[4, 2, 1]} />
    </mesh>
  )
}

const FractalShaderMaterial = shaderMaterial(
  { color_scheme: { type: 'int', value: 3 } },
  vertexShader,
  fragmentShader
)
extend({ FractalShaderMaterial })

export default Scene

// import { Canvas, useFrame } from '@react-three/fiber'
// import { useMemo, useRef } from 'react'
// import * as THREE from 'three'
// import { fragmentShader } from '../shader/fragmentShader'
// import { vertexShader } from '../shader/vertexShader'
// let uniforms
// let aspect = new THREE.Vector2(window.innerWidth, window.innerHeight)
// const Fractals = () => {
//   uniforms = useMemo(
//     () => ({
//   res: { type: 'vec2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
//   aspect: { type: 'float', value: aspect },
//   zoom: { type: 'float', value: 4.0 },
//   offset: { type: 'vec2', value: THREE.Vector2(-2.0 * aspect, -2.0) },
//   color_scheme: { type: 'int', value: 3 },
//   a: { type: 'float', value: 0 },
//   b: { type: 'float', value: 0 },
//   c: { type: 'float', value: 0 },
//   d: { type: 'float', value: 0 },
//   e: { type: 'float', value: 0 },
//   f: { type: 'float', value: 0 }
//     }),
//     []
//   )

//   const geometry = new THREE.PlaneGeometry(2, 2)
//   const material = new THREE.ShaderMaterial({
//     uniforms: uniforms,
//     fragmentShader: fragmentShader
//   })
//   const mesh = new THREE.Mesh(geometry, material)
//   let fractalScene = new THREE.Scene()
//   let camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)
//   let renderer = new THREE.WebGLRenderer()
//   renderer.setSize(window.innerWidth, window.innerHeight)
//   renderer.render(fractalScene, camera)

//   return (
//     <mesh ref={mesh} mesh={mesh} position={[0, 0, 0]} scale={1.5}>
//       <planeGeometry args={[1, 1, 16, 16]} />
//       <shaderMaterial fragmentShader={fragmentShader} uniforms={uniforms} wireframe={false} />
//     </mesh>
//   )
// }
// const MovingPlane = () => {
//   // This reference will give us direct access to the mesh
//   const mesh = useRef()

//   const uniforms = useMemo(
//     () => ({
//       u_time: {
//         value: 0.0
//       },
//       color_scheme: { type: 'int', value: 3 }
//     }),
//     []
//   )

//   useFrame((state) => {
//     const { clock } = state
//     mesh.current.material.uniforms.u_time.value = clock.getElapsedTime()
//   })

//   return (
//     <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
//       <planeGeometry args={[1, 1, 16, 16]} />
//       <shaderMaterial
//         fragmentShader={fragmentShader}
//         vertexShader={vertexShader}
//         uniforms={uniforms}
//         wireframe={false}
//       />
//     </mesh>
//   )
// }

// const Scene = () => {
//   return (
//     <Canvas camera={{ position: [1.0, 1.0, 1.0] }}>
//       <Fractals />
//     </Canvas>
//   )
// }

// export default Scene

// import React, { useMemo, useState, useRef } from 'react'
// import { useFrame } from '@react-three/fiber'
// import { Color, PlaneGeometry } from 'three'
// import { FRAGMENT_SHADER } from '../shader/fragmentShader'
// import { VERTEX_SHADER } from '../shader/vertexShader'
// // import { fragmentShader2 } from '../shader/fragmentShader2'

// const fragmentShader = '!!raw-loader!../shader/fragmentShader2.glsl'
// const vertexShader = '!!raw-loader!../shader/vertexShader2.glsl'

// const MovingPlane = () => {
//   // This reference will give us direct access to the mesh
//   const mesh = useRef()

//   const uniforms = useMemo(
//     () => ({
//       u_time: {
//         value: 0.0
//       },
//       u_colorA: { value: new Color('#FFE486') },
//       u_colorB: { value: new Color('#FEB3D9') }
//     }),
//     []
//   )

//   useFrame((state) => {
//     const { clock } = state
//     mesh.current.material.uniforms.u_time.value = clock.getElapsedTime()
//   })

//   return (
//     <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
//       <planeGeometry args={[1, 1, 16, 16]} />
//       <shaderMaterial
//         fragmentShader={fragmentShader}
//         vertexShader={vertexShader}
//         uniforms={uniforms}
//         wireframe={false}
//       />
//     </mesh>
//   )
// }

// const Scene = () => {
//   return (
//     <Canvas camera={{ position: [1.0, 1.0, 1.0] }}>
//       <MovingPlane />
//     </Canvas>
//   )
// }

// export default Scene
