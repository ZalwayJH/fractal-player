import React, { useState } from 'react';
import SongMenuCard from './SongMenuCard';
import { TbFileMusic } from 'react-icons/tb';
import { openFileFromDirectory, fileMetaData } from '../../API/windowAPIs';

function AddTracks({ setAddedTracks }) {
  async function handleAddingSongs() {
    try {
      const filePaths = await openFileFromDirectory();
      if (filePaths.length === 0) return [];

      handleGetFileMetaData(filePaths);

      // refined paths is temporary and will only work for me.
      // will need to see if i can get Howler to use absolute path instead of relative
      const refinedPaths = filePaths.map((path) => {
        return path.slice(59, path.length).replace(/\\/g, '/');
      });
      //   console.log(refinedPaths);
      // //Add songs to a song picker menu
      // setSongList(refinedPaths);
      // console.log('File paths received in React component:', filePaths);
    } catch (error) {
      console.error('Error in React component while adding songs:', error);
    }
  }

  async function handleGetFileMetaData(truePath) {
    const songData = await fileMetaData(truePath);
    const songListSet = new Set(songData);
    const songListArray = Array.from(songListSet);
    // console.log(songData);
    setAddedTracks(songListArray);
  }

  return (
    <>
      <TbFileMusic
        onClick={() => {
          handleAddingSongs();
        }}
        className="text-[#eec48a] text-xl row-start-2 cursor-pointer"
      />
    </>
  );
}

export default AddTracks;
