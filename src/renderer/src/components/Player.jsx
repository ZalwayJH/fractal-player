import React, { useState } from 'react';
import AudioProcessing from './Audio/AudioProcessing';
import SongMenuCard from './Audio/SongMenuCard';
import Visualizer from './Visualizer/Visualizer';
import { callFs } from '../API/windowAPIs';

function Player() {
  const [musicData, setMusicData] = useState([]);
  const [addedTracks, setAddedTracks] = useState([]);

  return (
    <>
      <AudioProcessing setMusicData={setMusicData} setAddedTracks={setAddedTracks} />
      <SongMenuCard addedTracks={addedTracks} />
      <Visualizer musicData={musicData} />
    </>
  );
}

export default Player;
