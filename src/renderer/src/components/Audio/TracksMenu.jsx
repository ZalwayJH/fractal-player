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
    <section className="h-full  border-r border-white/[0.2]   select-none rounded-none xl:w-5/12 max-w-[36rem] lg:w-4/12  mt-24 md:w-3/12 transition-all ease-in-out duration-100 bg-[#0e0818]/[0.99] z-30 fixed overflow-scroll">
      <div className=" p-4 max-w-[36rem] xl:w-5/12 transition-all border-r border-white/[0.2]   ease-in-out duration-100 top-0 fixed md:w-3/12 lg:w-4/12 bg-black/[0.9]">
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
      <table className="w-full    text-left">
        <tbody>
          {filteredItems.map(({ path, title, artist, album, duration, cover }, index) => {
            //const isLast = index === filteredItems.length - 1;
            let srcVal = cover !== null ? `data:image/png;base64, ${cover}` : defaultCover;
            const classes = 'p-1  border-b border-blue-gray-50/[0.2]  cursor-pointer ';
            return (
              <tr
                key={path}
                onClick={() => {
                  setSelectedSong(
                    [path].map((pathy) => {
                      return pathy.slice(59, path.length);
                    })
                  );
                }}
                className=" hover:bg-gray-800/[0.5]"
              >
                <td className=" border-b border-blue-gray-50/[0.2]  cursor-pointer ">
                  <div className="w-[40px] h-[40px] min-h-[40px] min-w-[40px] bg-black/[0.5] m-1">
                    <img src={srcVal} width="40" height="40" className="  object-cover " />
                  </div>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className=" text-gray-300 truncate w-[14em] text-md "
                  >
                    {title}
                  </Typography>

                  <Typography
                    variant="small"
                    color="blue-gray"
                    className=" truncate  w-[14em] text-sm text-gray-500  "
                  >
                    {artist}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className=" w-[12em] truncate  text-sm text-gray-500"
                  >
                    {album}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal w-[3em]   pl-3  text-sm  text-gray-500 "
                  >
                    {duration}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    varient="small"
                    color="blue-gray"
                    className="font-normal w-9 pl-2 ml-2 text-lg text-gray-500 "
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
