import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import { Howl, Howler } from 'howler';
import audioMoe from '../../songs/audoMoe.mp3';
import neverFadeAway from '../../songs/neverfadeaway.mp3';
import rebelpath from '../../songs/rebel path.mp3';
import RipandTear from '../../songs/RipandTear.mp3';

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

import { openFileFromDirectory } from '../../API/windowAPIs';

function AudioProcessing({ setMusicData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songList, setSongList] = useState([RipandTear]);
  const animationFrameIdRef = useRef(null);

  const music = useRef(
    new Howl({
      src: [...songList],
      html5: false,
      volume: 1.0,
      onplay: function () {
        // Initialize the analyser node
        const analyser = Howler.ctx.createAnalyser();
        analyser.fftSize = 1024; // Adjust as needed
        Howler.masterGain.connect(analyser);
        const bufferLength = analyser.frequencyBinCount;
        // Buffer to hold the audio data
        const dataArray = new Float32Array(bufferLength);
        const smoothedDataArray = new Float32Array(bufferLength);

        function getAudioData() {
          if (music.current.playing()) {
            // analyser.getByteFrequencyData(dataArray);
            analyser.getFloatTimeDomainData(dataArray);
            //Lowpass filter on dataArray to smooth out signal
            for (let i = 0; i < bufferLength; i++) {
              if (dataArray[i] < 0) {
                dataArray[i] = dataArray[i] * -1;
              }
              if (i === 0) {
                smoothedDataArray[i] = dataArray[i];
              } else {
                smoothedDataArray[i] = 0.8 * smoothedDataArray[i - 1] + 0.2 * dataArray[i];
              }
            }

            setMusicData(smoothedDataArray);
            // setMusicData(dataArray);
            //    Call this function again to keep updating the dataArray
            animationFrameIdRef.current = requestAnimationFrame(getAudioData);
          }
        }

        // Start retrieving audio data
        getAudioData();
      },
      onpause: function () {
        cancelAnimationFrame(animationFrameIdRef.current);
      },
      onstop: function () {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    })
  );

  useEffect(() => {
    music.current._src = songList;
  }, [songList]);

  const playPause = () => {
    if (isPlaying) {
      music.current.pause();
      setIsPlaying(false);
    } else {
      music.current.play();
      setIsPlaying(true);
    }
  };

  async function handleAddingSongs() {
    try {
      const filePaths = await openFileFromDirectory();

      if (filePaths.length === 0) return [];

      const refinedPaths = filePaths.map((path) => {
        return path.slice(59, path.length).replace(/\\/g, '/');
      });
      console.log(refinedPaths);
      //Add songs to a song picker menu
      setSongList(refinedPaths);
      // console.log(filePaths);
      // console.log('File paths received in React component:', filePaths);
    } catch (error) {
      console.error('Error in React component while adding songs:', error);
    }
  }

  function nextTrack() {
    let currentSong = music.current._src;
    let nextSong = '';
    return () => {
      for (let i = 0; i < songList.length; i++) {
        if (songList[i - 1] === currentSong && songList[i] !== currentSong) {
          nextSong = songList[i];
          music.current._src = nextSong;
        }
      }
    };
  }

  return (
    <div>
      <div className="group ease-in-out duration-300">
        <div
        // className={`z-10 right-5 left-5 bottom-0  rounded-md mx-auto h-6 min-w-min absolute  `}
        >
          <section className="z-10  bottom-5 right-5 left-5 lg:opacity-100 md:opacity-100 xsm:opacity-0 mx-auto max-w-[20em] min-w-[1em] absolute ease-out duration-300 transition-all bg-[#16161E]/90 ring-1 ring-white/[0.2] backdrop-blur-xl drop-shadow-lg  h-[19em] rounded-lg ">
            <div className="flex gap-4 bg-slate-600 w-[18em] h-[12em] mt-4 mx-auto ">
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
              <TbFileMusic
                onClick={handleAddingSongs}
                className="text-[#eec48a] text-xl row-start-2 cursor-pointer"
              />
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
              {/* <TbPlayerPlayFilled
                onClick={playPause}
                className="row-start-2 text-[#7aa2f7] text-5xl "
              /> */}
              <TbPlayerSkipForwardFilled
                className="text-[#4fd6be] text-2xl cursor-pointer  row-start-2 "
                onClick={() => {
                  nextTrack();
                }}
              />
              <TbRepeat className="text-[#c069cb] text-xl  row-start-2 " />
              <TbVolume className="text-[#c53b4b] text-xl  row-start-2 " />
            </div>
          </section>
          {/* <audio
            id="audioTag"
            ref={audioRef}
            src={audioSrc}
            className={`z-10 bottom-0 right-5 left-5 group-hover:bottom-5 mx-auto min-w-5 w-3/6 absolute ease-out duration-300 transition-all opacity-0 group-hover:opacity-100  `}
            controls
            controlsList="nodownload noplaybackrate"
            preload="true"
          ></audio> */}
        </div>
      </div>
    </div>
  );
}

export default AudioProcessing;