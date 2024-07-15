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
import { GoHeartFill } from 'react-icons/go';
import defaultCover from '../../assets/fractalDefault.png';

function TracksMenu({ setSelectedSong }) {
  const [filterText, setFilterText] = useState('');
  const { tracks, setTracks, status } = useGetTrackList();
  let tracksList = [];

  if (status === 'success') {
    tracksList = tracks;
  }

  //filter tracks based on title, album or artist
  const filteredItems = tracksList.filter(
    (item) =>
      (item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.album && item.album.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.artist && item.artist.toLowerCase().includes(filterText.toLowerCase()))
  );
  const onFilter = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <section className="h-full select-none rounded-none max-w-[500px] lg:w-4/12   md:w-3/12 transition-all ease-in-out duration-300 bg-[#16161E]/[0.99] z-30 fixed overflow-scroll">
      <div className="pt-5 px-4 max-w-none w-auto    bg-transparent">
        <Input
          label="Search"
          type="text"
          color="white"
          aria-label="Search Input"
          value={filterText}
          onChange={onFilter}
        />
        <AddTracks setTracksList={setTracks} />
      </div>
      <table className="w-full mt-3  text-left">
        <tbody>
          {filteredItems.map(({ path, title, artist, album, duration, cover }, index) => {
            const isLast = index === filteredItems.length - 1;
            let srcVal = cover !== null ? `data:image/png;base64, ${cover}` : defaultCover;
            const classes = ' border-b border-blue-gray-50/[0.2]  cursor-pointer ';
            return (
              <tr
                key={path}
                onClick={() => {
                  setSelectedSong(path);
                }}
                className=" hover:bg-gray-800/[0.5]"
              >
                <td className="p-3 border-b border-blue-gray-50/[0.2]  cursor-pointer  ">
                  <div className="w-[40px] h-[40px] min-h-[40px] min-w-[40px] ">
                    <img src={srcVal} width="40" height="40" className="  object-cover " />
                  </div>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className=" text-gray-300 truncate w-[180px] text-md "
                  >
                    {title}
                  </Typography>

                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal   w-[180px] text-sm text-gray-500  "
                  >
                    {artist}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal w-[70px] truncate  text-sm text-gray-500"
                  >
                    {album}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal w-9   pl-3  text-sm  text-gray-500 "
                  >
                    {duration}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    varient="small"
                    color="blue-gray"
                    className="font-normal w-9 pl-2 ml-2 text-lg truncate text-gray-500 "
                  >
                    <GoHeartFill />
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default TracksMenu;
