import { useState } from 'react';
import AudioController from './AudioController';
import TrackMenu from './TracksMenu';
import audiomoe from '../../songs/audoMoe.mp3';
function Audio({ setMusicData }) {
  const [selectedSong, setSelectedSong] = useState([audiomoe]);
  return (
    <div>
      <AudioController setMusicData={setMusicData} selectedSong={selectedSong} />
      <TrackMenu setSelectedSong={setSelectedSong} />
    </div>
  );
}

export default Audio;
