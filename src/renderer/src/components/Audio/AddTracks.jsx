import { TbFileMusic } from 'react-icons/tb';
import { openFileFromDirectory, writeFileMetaData } from '../../API/windowAPIs';
import { readFile } from '../../API/windowAPIs';

function AddTracks({ setTracksList }) {
  async function handleAddingSongs() {
    try {
      const filePaths = await openFileFromDirectory();
      if (filePaths.length === 0) return [];
      await writeFileMetaData(filePaths);
      const songData = await readFile();
      setTracksList(songData);
    } catch (error) {
      console.error('Error in React component while adding songs:', error.message);
      throw new Error(error.message);
      //const refinedPaths = filePaths.map((path) => {
      //return path.slice(59, path.length);
      //});
    }
  }

  return (
    <>
      <TbFileMusic
        onClick={() => {
          handleAddingSongs();
        }}
        className="text-[#eec48a] text-2xl cursor-pointer"
      />
    </>
  );
}

export default AddTracks;
