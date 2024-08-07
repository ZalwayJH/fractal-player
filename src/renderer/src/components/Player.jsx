import { useState } from 'react';

import Visualizer from './Visualizer/Visualizer';
import Audio from './Audio/Audio';
import VisPicker from './VisPicker';
function Player() {
  const [musicData, setMusicData] = useState([]);

  return (
    <div className="h-full min-h-[600px] ">
      <VisPicker />
      <Audio setMusicData={setMusicData} />
      <Visualizer musicData={musicData} />
    </div>
  );
}

export default Player;
