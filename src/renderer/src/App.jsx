import icons from './assets/icons.svg';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Visualizer from './components/Visualizer/Visualizer';
import TitleBar from './components/TitleBar/TitleBar';
import AudioProcessing from './components/Audio/AudioProcessing';
import SongMenuCard from './components/Audio/SongMenuCard';
import Player from './components/Player';
import { readFile } from './API/windowAPIs';
import { useQuery } from 'react-query';

function App() {
  const [tracksList, setTracksList] = useState([]);
  const getTrackList = useCallback(async () => {
    const list = await readFile();
    return list;
  }, [tracksList]);
  const { data, status, error } = useQuery({
    queryKey: ['getTrackList'],
    queryFn: getTrackList,
    refetchOnWindowFocus: false
  });
  useEffect(() => {
    if (status === 'success') {
      setTracksList(data);
      console.log('hello');
    }
  }, [status]);

  console.log('app');
  return (
    <div className="bg-[#2f3241] h-full min-h-[800px]">
      <TitleBar />
      <Player tracksList={tracksList} setTracksList={setTracksList} />
    </div>
  );
}

export default App;
