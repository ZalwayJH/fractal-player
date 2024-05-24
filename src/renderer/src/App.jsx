import { useState } from 'react';
import icons from './assets/icons.svg';
import Visualizer from './components/Visualizer';
import AudioControls from './components/menus/AudioControls';
import TitleBar from './components/menus/TitleBar';

function App() {
  const [musicData, setMusicData] = useState([]);
  return (
    <div className="bg-[#2f3241] h-full min-h-[650px]">
      <TitleBar />
      <AudioControls setMusicData={setMusicData} />
      <Visualizer musicData={musicData} />
    </div>
  );
}

export default App;
