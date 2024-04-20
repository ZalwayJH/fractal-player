import React, { useState, useRef, useEffect } from 'react';
import audioSrc from '../../songs/audoMoe.mp3';

function AudioControls() {
  const audioRef = useRef();

  return (
    <div>
      <div className="group ease-in-out duration-300">
        <div
          className={`z-10 right-5 left-5 bottom-0  rounded-md mx-auto h-6 min-w-min absolute  `}
        >
          <audio
            id="audioTag"
            ref={audioRef}
            src={audioSrc}
            className={`z-10 bottom-0 right-5 left-5 group-hover:bottom-5 mx-auto min-w-5 w-3/6 absolute ease-out duration-300 transition-all opacity-0 group-hover:opacity-100  `}
            controls
            controlsList="nodownload noplaybackrate"
            preload="true"
          ></audio>
        </div>
      </div>
    </div>
  );
}

export default AudioControls;
