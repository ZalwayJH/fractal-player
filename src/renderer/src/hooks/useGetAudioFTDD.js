import React, { useState, useRef } from 'react';

export function useGetAudioFTDD(song) {
  const [songData, setSongData] = useState([]);
  const animationFrameIdRef = useRef(null);

  const music = useRef(
    new Howl({
      src: [...song],
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

          setSongData(smoothedDataArray);
          // setMusicData(dataArray);
          //    Call this function again to keep updating the dataArray
          animationFrameIdRef.current = requestAnimationFrame(getAudioData);
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
  return { songData: songData, music: music };
}
