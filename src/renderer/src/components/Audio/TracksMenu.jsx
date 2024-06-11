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
  const tableHeaders = ['Title', 'Artist', 'Album', 'Duration'];

  return (
    <Card className="h-full select-none rounded-none  w-full max-w-[25%] bg-white/[0.4] backdrop-blur-xl fixed z-20 overflow-scroll">
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
        <thead>
          <tr>
            {tableHeaders.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-black/[0.9]  p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none  text-white opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(({ path, title, artist, album, duration }, index) => {
            const isLast = index === filteredItems.length - 1;
            const classes =
              'p-2 border-b border-blue-gray-50/[0.2] cursor-pointer text-xs truncate w-[100px]';
            return (
              <tr
                key={path}
                onClick={() => {
                  setSelectedSong(path);
                }}
                className=" hover:bg-gray-800/[0.5]"
              >
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold text-black truncate w-[100px] text-xs "
                  >
                    {title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal  w-[100px] text-xs text-black  "
                  >
                    {artist}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal w-[100px] text-xs text-black"
                  >
                    {album}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal w-[100px] text-xs pl-4 text-black"
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
