import React, { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

function Visualizer() {
  return (
    <div className="bg-blue-300 mx-4 h-auto">
      <Canvas>
        <ambientLight intensity={0.6} />
        <Scene />
      </Canvas>
    </div>
  )
}

export default Visualizer
