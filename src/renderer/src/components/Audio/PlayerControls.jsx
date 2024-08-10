import React, { useEffect, useState } from 'react';
import TracksMenu from './TracksMenu';
import { useGetAudioFTDD } from '../../hooks/useGetAudioFTDD';
import {
  TbPlayerPlay,
  TbPlayerPlayFilled,
  TbPlayerPause,
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
  TbVolume,
  TbArrowsShuffle,
  TbRepeat,
  TbFileMusic
} from 'react-icons/tb';
import { IoPlayOutline } from 'react-icons/io5';
import { CiPause1, CiPlay1 } from 'react-icons/ci';
import audiomoe from '../../../../../../songs/audoMoe.mp3';
const PlayerControls = ({ setMusicData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState({ songs: [], selection: [audiomoe] });
  //store the selected song in state and pass it to useGetAudioFTDD
  const { songData, musicRef, play, song } = useGetAudioFTDD(selectedSong);
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
      //song.pause();
      setIsPlaying(false);
    } else {
      //song.play();
      setIsPlaying(true);
      musicRef.current.play();
    }
  };

  return (
    <div>
      <TracksMenu setSelectedSong={setSelectedSong} />
      <div className="bg-black/[0.5]  border border-white/[0.2] m-3 rounded-b-lg select-none  gap-y-2  h-auto align-middle grid-row-4  items-center pb-5 justify-items-center  grid grid-cols-7   fixed bottom-0 xl:w-5/12 max-w-[36rem] lg:w-4/12  md:w-3/12 transition-all ease-in-out duration-100  z-40">
        <div className="w-11/12 min-h-7 h-6 flex justify-center flex-nowrap text-lg text-white col-span-7 mt-3 rounded-md">
          {isPlaying ? (
            <>
              <p className="ml-2  text-md truncate">
                now playing {selectedSong.selection[1]} {selectedSong.selection[2]}
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
        <span className="text-[#38c3a7] row-start-2 text-sm">0:54</span>
        <div
          id="temp-timeline"
          className="col-span-5 col-start-2 row-start-2 hover:bg-[#d13b76] drop-shadow-red bg-[#d13b76] w-full rounded-xl h-2 "
        ></div>
        <span className="text-red-200 row-start-2 text-sm">3:15</span>
        <TbFileMusic className="text-[#2ac3de] hover:drop-shadow-green text-xl row-start-3" />

        {/*
                <AddTracks setTracksList={setTracksList} /> */}
        <TbArrowsShuffle className=" hover:text-[#ff9e64] text-deep-orange-400  hover:drop-shadow-orange  text-xl  row-start-3 " />
        <TbPlayerSkipBackFilled className=" text-2xl text-[#ff9e64]  hover:drop-shadow-orange   row-start-3 " />
        {isPlaying ? (
          <CiPause1
            id="pause"
            onClick={playPause}
            className="row-start-3 text-blue-300 hover:drop-shadow-blue cursor-pointer text-5xl "
          />
        ) : (
          <TbPlayerPlayFilled
            id="play"
            onClick={playPause}
            className="row-start-3 text-blue-300 hover:drop-shadow-blue cursor-pointer text-5xl "
          />
        )}
        <TbPlayerSkipForwardFilled className="hover:text-[#d13b76]  hover:drop-shadow-red text-[#d13b76]  text-2xl  row-start-3 " />
        <TbRepeat className=" text-xl   text-blue-50 hover:drop-shadow-cyan  row-start-3 " />
        <TbVolume className="hover:text-[#d13b76] hover:drop-shadow-red text-[#d13b76] text-xl  row-start-3 " />
      </div>
    </div>
  );
};

export default PlayerControls;
