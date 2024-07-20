import { useState, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { useEffect } from 'react';

export function useGetAudioFTDD(selectedSong, setIsPlaying) {
  const [songData, setSongData] = useState([]);
  const animationFrameIdRef = useRef(null);
  const musicRef = useRef(null);
  //const refinedPaths = selectedSong.map((path) => {
  //  return path.slice(59, path.length);
  //});
  //console.log(refinedPaths, 'refinedPaths');
  //console.log(song);
  console.log(selectedSong);
  useEffect(() => {
    musicRef.current = new Howl({
      src: selectedSong,
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

        function getAudioData() {
          analyser.getFloatTimeDomainData(dataArray);
          //loop through data, converting every negative number to positive and round up 2 decimal places
          for (let i = 0; i < bufferLength; i++) {
            if (dataArray[i] < 0) {
              dataArray[i] = dataArray[i] * -1;
              dataArray[i] = Math.round((dataArray[i] + Number.EPSILON) * 100) / 10;
            }
          }
          setSongData(dataArray);
        }
        // Start retrieving audio data
        getAudioData();
      },
      onpause: function () {
        console.log('paused');
        // populate dataArray with 0's when paused for glsl shader convenience
        cancelAnimationFrame(animationFrameIdRef.current);
        resetDataArray();
      },
      onstop: function () {
        console.log('stopped <-- not expected ');
        cancelAnimationFrame(animationFrameIdRef.current);
        resetDataArray();
      },

      onload: function () {
        console.log('loaded');
      },
      onend: function () {
        console.log('ended');
      }
    });
  }, [selectedSong]);
  //const musicRef = useRef(
  //  new Howl({
  //    src: selectedSong,
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
  //
  //      function getAudioData() {
  //        analyser.getFloatTimeDomainData(dataArray);
  //        //loop through data, converting every negative number to positive and round up 2 decimal places
  //        for (let i = 0; i < bufferLength; i++) {
  //          if (dataArray[i] < 0) {
  //            dataArray[i] = dataArray[i] * -1;
  //            dataArray[i] = Math.round((dataArray[i] + Number.EPSILON) * 100) / 10;
  //          }
  //        }
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
  console.log(songData);
  function resetDataArray() {
    const resetArray = new Float32Array(512);
    setSongData(resetArray);
  }
  return { songData: songData, musicRef: musicRef };
}
