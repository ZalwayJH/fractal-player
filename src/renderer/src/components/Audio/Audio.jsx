import { useState } from 'react';
import AudioController from './AudioController';
import TrackMenu from './TracksMenu';

function Audio({ setMusicData }) {
  const [selectedSong, setSelectedSong] = useState('');
  return (
    <div>
      <AudioController setMusicData={setMusicData} selectedSong={selectedSong} />
      <TrackMenu setSelectedSong={setSelectedSong} />
    </div>
  );
}

export default Audio;
