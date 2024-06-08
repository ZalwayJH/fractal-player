import React, { useState, useEffect, useCallback } from 'react';
import AudioProcessing from './Audio/AudioProcessing';
import SongMenuCard from './Audio/SongMenuCard';
import Visualizer from './Visualizer/Visualizer';
import { useQuery } from 'react-query';
import { readFile } from '../API/windowAPIs';
import { useGetTrackList } from '../hooks/useGetTrackList';
function Player() {
  const [musicData, setMusicData] = useState([]);
  const { tracksList, setTracksList, status, error } = useGetTrackList();
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <main className="h-full">
      <AudioProcessing setMusicData={setMusicData} setTracksList={setTracksList} />
      <SongMenuCard tracksList={tracksList} />
      <Visualizer musicData={musicData} />
    </main>
  );
}

export default Player;
