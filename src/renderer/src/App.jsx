import icons from './assets/icons.svg';
import Visualizer from './components/Visualizer';
import AudioControls from './components/menus/AudioControls';

function App() {
  return (
    <div className="bg-[#2f3241] h-full min-h-[650px]">
      <AudioControls />
      <Visualizer />
    </div>
  );
}

export default App;
