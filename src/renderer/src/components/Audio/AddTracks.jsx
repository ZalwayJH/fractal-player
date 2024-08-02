import { TbFileMusic } from 'react-icons/tb';
import { openFileFromDirectory, writeFileMetaData } from '../../API/windowAPIs';
import { readFile } from '../../API/windowAPIs';
import { Input } from '@material-tailwind/react';
function AddTracks({ refetch }) {
  //async function handleAddingSongs() {
  //  try {
  //    const filePaths = await openFileFromDirectory();
  //    if (filePaths.length === 0) return [];
  //    await writeFileMetaData(filePaths);
  //    const tracks = await readFile();
  //    setTracksList(setTracksList) ;
  //  } catch (error) {
  //    console.error('Error in React component while adding songs:', error.message);
  //    throw new Error(error.message);
  //    //const refinedPaths = filePaths.map((path) => {
  //    //return path.slice(59, path.length);
  //    //});
  //  }
  //}
  async function onChange(event) {
    if (event.target.files.length > 0) {
      try {
        const files = [...event.target.files];
        const filePaths = files.map((song) => song.path);
        if (filePaths.length === 0) return;
        await writeFileMetaData(filePaths);
        refetch();
      } catch (e) {
        console.error(e);
      }

      //const reader = new FileReader();
      //reader.addEventListener('load', () => {
      //  //raw base64 of audio file
      //  const data = reader.result;
      //  console.log(data);
      //});
      //reader.readAsDataURL(files[0]);
    }
    //    onClick={handleAddingSongs}
    //  />
  }
  return (
    <div>
      <TbFileMusic
        className="text-[#eec48a] absolute top-12 text-3xl z-10"
        type="file"
        onChange={onChange}
      />
      <input className="opacity-1 w-8 z-50" type="file" multiple onChange={onChange} />
    </div>
  );
}

export default AddTracks;
