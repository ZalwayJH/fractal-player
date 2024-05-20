import React, { useMemo, useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Fractal from './Fractal';
import Orb from './orb';

function Visualizer() {
  const [scene, setScene] = useState('Fractal');
  return (
    <div className="h-full z-0">
      <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
        <Suspense fallback={null}>
          <Routes>
            <Route exact path="/" element={<Fractal />} />
            <Route exact path="/orb" element={<Orb />} />
          </Routes>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Visualizer;
