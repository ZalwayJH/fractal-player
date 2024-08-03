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

import audiomoe from '../../../../../../songs/audoMoe.mp3';
const PlayerControls = ({ setMusicData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState({ songs: [], selection: [audiomoe] });
  //store the selected song in state and pass it to useGetAudioFTDD
  const { songData, musicRef, play } = useGetAudioFTDD(selectedSong);
  //update musicData whenever the data from useGetAudioFTDD changes
  console.log(selectedSong.songs);
  useEffect(() => {
    if (songData.length > 0) {
      setMusicData(songData);
    }
  }, [songData]);
  const playPause = () => {
    console.log(musicRef);
    if (isPlaying) {
      musicRef.current.pause();

      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      musicRef.current.play();
    }
  };
  return (
    <div>
      <TracksMenu setSelectedSong={setSelectedSong} />
      <div className="bg-black border border-white/[0.2] m-3 rounded-b-lg border-t gap-y-2  h-auto align-middle grid-row-4  items-center pb-5 justify-items-center  grid grid-cols-7   fixed bottom-0 xl:w-5/12 max-w-[36rem] lg:w-4/12  md:w-3/12 transition-all ease-in-out duration-100 bg-[#0e0818]/[0.99]  z-40">
        <div className="self-center max-w-44 max-h-36 row-start-1 text-lg truncate col-span-7 w-full rounded-md  mb-3 mt-6 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400">
          <img src={selectedSong.selection[3]} /> {selectedSong.selection[1]}{' '}
          {selectedSong.selection[2]}
        </div>
        <span className="text-[#38c3a7] row-start-2 text-sm">0:54</span>
        <div
          id="temp-timeline"
          className="col-span-5 col-start-2 row-start-2 bg-[#c53b53] w-full rounded-xl h-2 "
        ></div>
        <span className="text-red-200 row-start-2 text-sm">3:15</span>
        <div id="open-tracklist" title="open-tracklist" className="text-red-200 row-start-3">
          <p>open</p>
        </div>
        {/*
                <AddTracks setTracksList={setTracksList} /> */}
        <TbArrowsShuffle className="text-[#bb9af7] text-xl  row-start-3 " />
        <TbPlayerSkipBackFilled className="text-[#ff9e64] text-2xl    row-start-3 " />
        {isPlaying ? (
          <TbPlayerPauseFilled
            id="pause"
            onClick={playPause}
            className="row-start-3 text-[#7aa2f7]  cursor-pointer  text-5xl "
          />
        ) : (
          <TbPlayerPlayFilled
            id="play"
            onClick={playPause}
            className="row-start-3 text-[#7aa2f7]   cursor-pointer text-5xl "
          />
        )}
        <TbPlayerSkipForwardFilled className="text-[#4fd6be] text-2xl  row-start-3 " />
        <TbRepeat className="text-[#c069cb] text-xl  row-start-3 " />
        <TbVolume className="text-[#c53b4b] text-xl  row-start-3 " />
      </div>
    </div>
  );
};

export default PlayerControls;
