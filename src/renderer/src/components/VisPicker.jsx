import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function VisPicker() {
  let colLength = 12;
  let vis = 2;
  return (
    <section className="z-10 overflow-x-auto bottom-10 right-5 left-5  mx-auto max-w-[15em] min-w-[1em] fixed ease-out duration-300 transition-all bg-[#16161E]/80 ring-1 ring-white/[0.2] backdrop-blur-xl drop-shadow-lg  h-[10em] rounded-lg ">
      <div className="grid grid-cols-12 place-items-center  grid-rows-1 w-full h-full ">
        <Link className={`bg-red-600 col-start-1  col-span-${colLength / vis} `} to="/orb">
          Orb
        </Link>
        <Link className={`bg-blue-600 col-start-7 col-span-5`} to="/fractal ">
          fractal
        </Link>
      </div>
    </section>
  );
}

export default VisPicker;
