import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Fractal from './Fractal';
import Orb from './Orb';

//using routes/url to decide which visualizer scene to load
function Visualizer({ musicData }) {
  return (
    <div className="h-full z-0 w-full  ">
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
