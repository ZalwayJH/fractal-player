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

          <div className="w-full absolute h-[7em] items-center pb-5 justify-items-center  grid grid-cols-7 ">
            <span className="text-[#38c3a7] text-sm">0:54</span>
            <div
              id="temp-timeline"
              className="col-span-5 col-start-2 bg-[#c53b53] w-full rounded-xl h-2 "
            ></div>
            <span className="text-red-200 text-sm">3:15</span>
            <div id="open-tracklist" title="open-tracklist" className="text-red-200 row-start-2">
              <p>open</p>
            </div>
            {/*
                <AddTracks setTracksList={setTracksList} /> */}
            <TbArrowsShuffle className="text-[#bb9af7] text-xl  row-start-2 " />
            <TbPlayerSkipBackFilled className="text-[#ff9e64] text-2xl  row-start-2 " />
            {isPlaying ? (
              <TbPlayerPauseFilled
                onClick={playPause}
                className="row-start-2 text-[#7aa2f7] text-5xl "
              />
            ) : (
              <TbPlayerPlayFilled
                onClick={playPause}
                className="row-start-2 text-[#7aa2f7] text-5xl "
              />
            )}
            <TbPlayerSkipForwardFilled className="text-[#4fd6be] text-2xl cursor-pointer  row-start-2 " />
            <TbRepeat className="text-[#c069cb] text-xl  row-start-2 " />
            <TbVolume className="text-[#c53b4b] text-xl  row-start-2 " />
          </div>
        </section>
      </div>
    </div>
  );
}

export default AudioController;
