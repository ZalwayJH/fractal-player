import { TbFileMusic } from 'react-icons/tb';
import { writeFileMetaData } from '../../API/windowAPIs';
function AddTracks({ refetch }) {
  async function onChange(event) {
    if (event.target.files.length > 0) {
      try {
        const files = [...event.target.files];
        console.log(files);
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
      <label className="inline-block text-3xl  text-gray-300 cursor-pointer hover:text-[#eec48a]">
        <TbFileMusic />
        <input
          className="hidden"
          type="file"
          multiple
          onChange={onChange}
          directory="true"
          webkitfile="true"
          file="true"
        />
      </label>
    </div>
  );
}

export default AddTracks;
