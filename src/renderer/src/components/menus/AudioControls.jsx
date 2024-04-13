import React, { useState } from 'react';

function AudioControls() {
  const [isOpen, setIsOpen] = useState('hidden');
  return (
    <div className="group">
      <div
        className={`z-10 right-5 left-5 bottom-5 rounded-md group-hover:hidden mx-auto min-w-5 w-3/6 h-3 backdrop-blur-sm bg-white/60 absolute group-hover:$ `}
      ></div>
      <audio
        src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-61905/zapsplat_multimedia_alert_chime_short_musical_notification_cute_child_like_001_64918.mp3?_=1"
        className={`z-10   right-5 left-5 bottom-5 mx-auto min-w-5 w-3/6 absolute opacity-0 group-hover:opacity-100 `}
        controls
        controlsList="nodownload noplaybackrate"
      ></audio>
    </div>
  );
}

export default AudioControls;
