// import { DataTable } from 'primereact/datatable';
import { useState } from 'react';
import {
  Card,
  Typography,
  Input,
  CardHeader,
  TabsHeader,
  Button,
  Tabs
} from '@material-tailwind/react';
import { useGetTrackList } from '../../hooks/useGetTrackList';
import AddTracks from './AddTracks';
import defaultCover from '../../assets/fractalDefault.png';
function TracksMenu({ setSelectedSong }) {
  const [filterText, setFilterText] = useState('');
  const { tracks, setTracks, status, error } = useGetTrackList();

  let tracksList = [];
  if (error) {
    throw new Error(error.message);
  }

  if (status === 'success') {
    tracksList = tracks;
  }
  const filteredItems = tracksList.filter(
    (item) =>
      (item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.album && item.album.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.artist && item.artist.toLowerCase().includes(filterText.toLowerCase()))
  );
  const onFilter = (e) => {
    setFilterText(e.target.value);
  };
  const tableHeaders = ['', 'Title', 'Artist', 'Album', 'Duration'];

  return (
    <Card className="h-full select-none rounded-none  w-full max-w-[25%] bg-[#1a1b26]/[1] backdrop-blur-xl fixed z-20 overflow-scroll">
      <AddTracks setTracksList={setTracks} />
      <CardHeader floated={false} shadow={false} className=" h-[45px] mb-4 bg-transparent">
        <div className="flex flex-col my-5   items-center ">
          <div className="fixed ml-[0.40rem]  top-7">
            <Input
              className=" w-full"
              label="Search"
              type="text"
              color="white"
              aria-label="Search Input"
              value={filterText}
              onChange={onFilter}
            />
          </div>
        </div>
      </CardHeader>
      <table className="w-full mt-3 table-auto text-left">
        <tbody>
          {filteredItems.map(({ path, title, artist, album, duration, cover }, index) => {
            const isLast = index === filteredItems.length - 1;
            let srcVal = cover !== null ? `data:image/png;base64, ${cover}` : defaultCover;
            const classes = 'p-2 border-b border-blue-gray-50/[0.2]  cursor-pointer ';
            return (
              <tr
                key={path}
                onClick={() => {
                  setSelectedSong(path);
                }}
                className=" hover:bg-gray-800/[0.5]"
              >
                <td className="p-2 border-b border-blue-gray-50/[0.2]  cursor-pointer ">
                  <img src={srcVal} width="30" height="30" className=" min-h-[30px]" />
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold text-gray-300 truncate w-[100px] text-xs "
                  >
                    {title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal  w-[100px] text-xs text-gray-300  "
                  >
                    {artist}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal w-[100px] text-xs text-gray-300"
                  >
                    {album}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal w-[100px] text-xs pl-4 text-gray-300"
                  >
                    {duration}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default TracksMenu;
