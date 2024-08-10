import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from '@material-tailwind/react';
import fratImage from '../assets/fractalDefault.png';
import orb from '../assets/orb.jpg';
function VisPicker() {
  return (
    <Carousel
      loop
      className="z-10 text-black select-none  bottom-10 right-5 left-5  mx-auto max-w-[10em] min-w-[1em] fixed ease-out duration-300 transition-all bg-[#16161E]/80 ring-1 ring-white/[0.2] backdrop-blur-xl drop-shadow-lg  h-[10em] rounded-lg "
    >
      <Link to="/orb">
        <img src={orb} className="object-cover w-full h-full" />
      </Link>
      <Link to="/fractal ">
        <img src={fratImage} className="object-cover w-full h-full" />
      </Link>
    </Carousel>
  );
}

export default VisPicker;
