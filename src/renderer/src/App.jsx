import { BrowserRouter } from 'react-router-dom';
import icons from './assets/icons.svg';
import Visualizer from './components/Visualizer';
import AudioControls from './components/menus/AudioControls';
import TitleBar from './components/menus/TitleBar';

function App() {
  return (
    <div className="bg-[#2f3241] h-full min-h-[650px]">
      <TitleBar />
      <AudioControls />
      <Visualizer />
    </div>
  );
}

export default App;
