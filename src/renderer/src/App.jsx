import icons from './assets/icons.svg';

import TitleBar from './components/TitleBar/TitleBar';
import Player from './components/Player';

function App() {
  return (
    <div className="bg-[#2f3241] h-full min-h-[800px]">
      <TitleBar />
      <Player />
    </div>
  );
}

export default App;
