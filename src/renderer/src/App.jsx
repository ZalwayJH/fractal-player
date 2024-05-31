import { useState } from 'react';
import icons from './assets/icons.svg';
import Visualizer from './components/Visualizer/Visualizer';

import TitleBar from './components/menus/TitleBar';
import AudioProcessing from './components/Audio/AudioProcessing';

function App() {
  const [musicData, setMusicData] = useState([]);
  return (
    <div className="bg-[#2f3241] h-full min-h-[650px]">
      <TitleBar />
      <AudioProcessing setMusicData={setMusicData} />
      <Visualizer musicData={musicData} />
    </div>
  );
}

export default App;
