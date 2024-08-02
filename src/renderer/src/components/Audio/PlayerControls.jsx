import React, { useEffect, useState } from 'react';
import TracksMenu from './TracksMenu';
import { useGetAudioFTDD } from '../../hooks/useGetAudioFTDD';
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

import audiomoe from '../../songs/audoMoe.mp3';
const PlayerControls = ({ setMusicData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState({ songs: [], selection: [audiomoe] });
  //store the selected song in state and pass it to useGetAudioFTDD
  const { songData, musicRef, play } = useGetAudioFTDD(selectedSong);
  //update musicData whenever the data from useGetAudioFTDD changes

  useEffect(() => {
    if (songData.length > 0) {
      setMusicData(songData);
    }
  }, [songData]);
  const playPause = () => {
    if (isPlaying) {
      //musicRef.current.pause();
      setIsPlaying(false);
    } else {
      play();
      //musicRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <TracksMenu setSelectedSong={setSelectedSong} />
      <div className="bg-black border border-white/[0.2] m-3 rounded-b-lg border-t  h-[8em] align-middle grid-row-1  items-center pb-5 justify-items-center  grid grid-cols-7   fixed bottom-0 xl:w-5/12 max-w-[36rem] lg:w-4/12  md:w-3/12 transition-all ease-in-out duration-100 bg-[#0e0818]/[0.99]  z-40">
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
        <TbPlayerSkipBackFilled className="text-[#ff9e64] text-2xl    row-start-2 " />
        {isPlaying ? (
          <TbPlayerPauseFilled
            id="pause"
            onClick={playPause}
            className="row-start-2 text-[#7aa2f7]  cursor-pointer  text-5xl "
          />
        ) : (
          <TbPlayerPlayFilled
            id="play"
            onClick={playPause}
            className="row-start-2 text-[#7aa2f7]   cursor-pointer text-5xl "
          />
        )}
        <TbPlayerSkipForwardFilled className="text-[#4fd6be] text-2xl  row-start-2 " />
        <TbRepeat className="text-[#c069cb] text-xl  row-start-2 " />
        <TbVolume className="text-[#c53b4b] text-xl  row-start-2 " />
      </div>
    </div>
  );
};

export default PlayerControls;
