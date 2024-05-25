import React, { useMemo, useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Howler, Howl } from 'howler';
import { Canvas } from '@react-three/fiber';
import Fractal from './Fractal';
import Orb from './orb';

function Visualizer({ musicData }) {
  return (
    <div className="h-full z-0">
      <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
        <Suspense fallback={null}>
          <Routes>
            <Route exact path="/fractal" element={<Fractal musicData={musicData} />} />
            <Route exact path="/orb" element={<Orb musicData={musicData} />} />
          </Routes>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Visualizer;
