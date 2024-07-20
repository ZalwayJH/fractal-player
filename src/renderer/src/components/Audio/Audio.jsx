import { useState } from 'react';
import AudioController from './AudioController';
import TrackMenu from './TracksMenu';
import PlayerControls from './PlayerControls';
function Audio({ setMusicData }) {
  return (
    <div>
      <AudioController />
      <PlayerControls setMusicData={setMusicData} />
    </div>
  );
}

export default Audio;
