import { useState, useRef, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import path from 'path';

//import audioMoe from '../songs/audoMoe.mp3';
export function useGetAudioFTDD(selectedSong) {
  const [songData, setSongData] = useState(new Float32Array(0));
  const animationFrameIdRef = useRef(null);
  const musicRef = useRef(null);
  //let musicRef;
  const play = () => {};
  //musicRef.current = audio;
  //if (selectedSong.selection.length === 0) return;
  //const refinedPaths = selectedSong.selection.map((path) => {
  //  return path.slice(59, path.length);
  //});
  ////console.log(refinedPaths, 'refinedPaths');
  ////console.log(song);
  //console.log(refinedPaths);
  useEffect(() => {
    console.log(selectedSong.selection);
    const songPath = selectedSong.selection[0].replace('/@fs/', '');
    const fileURL = `file:${songPath}`;
    const song = new Audio(fileURL);
    musicRef.current = song;
    const context = new AudioContext();
    const analyzer = context.createAnalyser();
    const source = context.createMediaElementSource(song);
    song.onplay = function () {
      analyzer.fftSize = 1024;
      source.connect(analyzer);
      analyzer.connect(context.destination);
      const bufferLength = 512;
      const dataArray = new Float32Array(bufferLength);
      function getAudioData() {
        analyzer.getFloatTimeDomainData(dataArray);
        //loop through data, converting every negative number to positive and round up 2 decimal places
        for (let i = 0; i < bufferLength; i++) {
          if (dataArray[i] < 0) {
            dataArray[i] = dataArray[i] * -1;
            dataArray[i] = Math.round((dataArray[i] + Number.EPSILON) * 100) / 10;
          }
        }
        console.log(dataArray);
        setSongData(dataArray);
        animationFrameIdRef.current = requestAnimationFrame(getAudioData);
      }
      // Start retrieving audio data
      getAudioData();
    };
    song.onpause = function () {
      // populate dataArray with 0's when paused for glsl shader convenience
      cancelAnimationFrame(animationFrameIdRef.current);
      resetDataArray();
    };
    song.onstop = function () {
      cancelAnimationFrame(animationFrameIdRef.current);
      resetDataArray();
    };
    function resetDataArray() {
      const resetArray = new Float32Array(512);
      setSongData(resetArray);
    }
  }, [selectedSong.selection]);
  //const musicRef = useRef(
  //  new Howl({
  //    src: fileURL,
  //    format: ['.mp3'],
  //    html5: false,
  //    volume: 1.0,
  //    onplay: function () {
  //      // Initialize the analyser node
  //      const analyser = Howler.ctx.createAnalyser();
  //      analyser.fftSize = 1024; // Adjust as needed
  //      Howler.masterGain.connect(analyser);
  //      const bufferLength = analyser.frequencyBinCount;
  //      // Buffer to hold the audio data
  //      const dataArray = new Float32Array(bufferLength);
  //      function getAudioData() {
  //        analyser.getFloatTimeDomainData(dataArray);
  //        //loop through data, converting every negative number to positive and round up 2 decimal places
  //        for (let i = 0; i < bufferLength; i++) {
  //          if (dataArray[i] < 0) {
  //            dataArray[i] = dataArray[i] * -1;
  //            dataArray[i] = Math.round((dataArray[i] + Number.EPSILON) * 100) / 10;
  //          }
  //        }
  //        console.log(dataArray);
  //        setSongData(dataArray);
  //        animationFrameIdRef.current = requestAnimationFrame(getAudioData);
  //      }
  //      // Start retrieving audio data
  //      getAudioData();
  //    },
  //    onpause: function () {
  //      // populate dataArray with 0's when paused for glsl shader convenience
  //      cancelAnimationFrame(animationFrameIdRef.current);
  //      resetDataArray();
  //    },
  //    onstop: function () {
  //      cancelAnimationFrame(animationFrameIdRef.current);
  //      resetDataArray();
  //    },
  //    onselect: function () {
  //      //set current song _src ?
  //    }
  //  })
  //);
  //
  //function resetDataArray() {
  //  const resetArray = new Float32Array(512);
  //  setSongData(resetArray);
  //}
  return { songData: songData, musicRef: musicRef, play: play };
}
