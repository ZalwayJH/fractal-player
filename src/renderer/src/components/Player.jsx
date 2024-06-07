import React, { useState, useEffect } from 'react';
import AudioProcessing from './Audio/AudioProcessing';
import SongMenuCard from './Audio/SongMenuCard';
import Visualizer from './Visualizer/Visualizer';
import { useQuery } from 'react-query';
import { readFile } from '../API/windowAPIs';

function Player({ tracksList, setTracksList }) {
  const [musicData, setMusicData] = useState([]);
  const [addedTracks, setAddedTracks] = useState([]);

  return (
    <main className="h-full">
      <AudioProcessing setMusicData={setMusicData} setTracksList={setTracksList} />
      <SongMenuCard tracksList={tracksList} />
      <Visualizer musicData={musicData} />
    </main>
  );
}

export default Player;
