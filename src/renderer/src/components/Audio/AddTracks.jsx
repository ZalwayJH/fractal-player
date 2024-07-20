import { TbFileMusic } from 'react-icons/tb';
import { openFileFromDirectory, writeFileMetaData } from '../../API/windowAPIs';
import { readFile } from '../../API/windowAPIs';

function AddTracks({ setTracksList }) {
  async function handleAddingSongs() {
    try {
      const filePaths = await openFileFromDirectory();
      if (filePaths.length === 0) return [];
      await writeFileMetaData(filePaths);
      const tracks = await readFile();
      setTracksList(tracks);
    } catch (error) {
      console.error('Error in React component while adding songs:', error.message);
      throw new Error(error.message);
      //const refinedPaths = filePaths.map((path) => {
      //return path.slice(59, path.length);
      //});
    }
  }

  return (
    <div>
      <TbFileMusic
        onClick={() => {
          handleAddingSongs();
        }}
        className="text-[#eec48a]  text-2xl cursor-pointer"
      />
    </div>
  );
}

export default AddTracks;
