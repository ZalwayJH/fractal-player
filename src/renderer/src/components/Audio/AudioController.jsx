import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import audioMoe from '../../songs/audoMoe.mp3';
import neverFadeAway from '../../songs/neverfadeaway.mp3';
import rebelpath from '../../songs/rebel path.mp3';
import RipandTear from '../../songs/RipandTear.mp3';
import autoTune from '../../songs/Autotune.mp3';
import wind from '../../songs/SMZA.mp3';
import teachers from '../../songs/Witchney Houston - T34CH3R5.mp3';
import {
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
  TbVolume,
  TbArrowsShuffle,
  TbRepeat,
  TbFileMusic
} from 'react-icons/tb';
import { useGetAudioFTDD } from '../../hooks/useGetAudioFTDD';

function AudioController({ setMusicData, selectedSong }) {
  const [isPlaying, setIsPlaying] = useState(false);

  //store the selected song in state and pass it to useGetAudioFTDD
  const { songData, musicRef } = useGetAudioFTDD(selectedSong, setIsPlaying);

  //update musicData whenever the data from useGetAudioFTDD changes
  useEffect(() => {
    if (songData.length > 0) {
      setMusicData(songData);
    }
  }, [songData]);
  const playPause = () => {
    if (isPlaying) {
      musicRef.current.pause();
      setIsPlaying(false);
    } else {
      musicRef.current.play();
      setIsPlaying(true);
    }
  };

  console.log(musicRef.current);

  return (
    <div>
      <div className="group ease-in-out duration-300">
        <section className="z-10  bottom-5 right-5 left-5 lg:opacity-100 md:opacity-100 xsm:opacity-0 mx-auto max-w-[20em] min-w-[1em] fixed ease-out duration-300 transition-all bg-[#16161E]/80 ring-1 ring-white/[0.2] backdrop-blur-xl drop-shadow-lg  h-[19em] rounded-lg ">
          <div className="flex gap-4 bg-blue-200 w-auto  h-[12em] mt-4 mx-auto ">
            <Link to="/orb">
              <div className="bg-red-600  w-5 h-1" />
            </Link>
            <Link to="/fractal">
              <div className="bg-blue-500  w-5 h-1" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AudioController;
