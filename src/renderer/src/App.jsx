import icons from './assets/icons.svg';
import Visualizer from './components/Visualizer/Visualizer';
import TitleBar from './components/TitleBar/TitleBar';
import AudioProcessing from './components/Audio/AudioProcessing';
import SongMenuCard from './components/Audio/SongMenuCard';
import Player from './components/Player';
import { readFile } from './API/windowAPIs';

function App() {
  return (
    <div className="bg-[#2f3241] h-full min-h-[800px]">
      <TitleBar />
      <Player />
    </div>
  );
}

export default App;
