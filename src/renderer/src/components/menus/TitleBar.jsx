import React from 'react';
import { ipcRenderer } from 'electron';
function TitleBar() {
  return (
    <div
      id="titleBar"
      className=" z-20 w-full grid grid-flow-col justify-end gap-5 auto-cols-max absolute m-0 top-0 p-3  "
    >
      <button
        id="titleButtonsMin"
        className=" rounded-xl p-2 z-30  backdrop-blur-xl  bg-white/[0.1]  hover:bg-[#4fd6be]/[1] ring-white/[0.2] ring-1 hover:shadow-[0px_0px_10px_1px_#4fd6be] "
        onClick={() => {
          ipcRenderer.send('minimize-window');
        }}
      ></button>
      <button
        id="titleButtonsMax"
        className="rounded-xl p-2 z-30   backdrop-blur-xl bg-white/[0.1] hover:bg-[#7aa2f7]/[1]  ring-white/[0.2] ring-1 hover:shadow-[0px_0px_10px_1px_#7aa2f7]"
        onClick={() => {
          ipcRenderer.send('maximize-window');
        }}
      ></button>
      <button
        id="titleButtonsClose"
        className="rounded-xl z-30 p-2 backdrop-blur-xl bg-white/[0.1]  hover:bg-rose-400/[1] ring-white/[0.2] ring-1 hover:shadow-[0px_0px_10px_1px_#c53b53]"
        onClick={() => {
          ipcRenderer.send('close-window');
        }}
      ></button>
    </div>
  );
}

export default TitleBar;