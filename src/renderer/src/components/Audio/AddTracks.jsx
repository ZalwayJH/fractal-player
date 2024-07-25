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
  function onChange(event) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      console.log(files, 'files');
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        //raw base64 of audio file
        const data = reader.result;
      });
    }
  }
  return (
    <div>
      <TbFileMusic
        onClick={handleAddingSongs}
        className="text-[#eec48a]  text-2xl cursor-pointer"
        type="file"
      />
      <input type="file" multiple onChange={onChange} />
    </div>
  );
}

export default AddTracks;
