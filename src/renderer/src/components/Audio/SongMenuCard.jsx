// import { DataTable } from 'primereact/datatable';
import { useState, useMemo, useEffect } from 'react';
import {
  Card,
  Typography,
  Input,
  CardHeader,
  TabsHeader,
  Button,
  Tabs
} from '@material-tailwind/react';
import { readFile } from '../../API/windowAPIs';

function SongMenuCard({ tracksList }) {
  const [filterText, setFilterText] = useState('');

  const tableRows = tracksList.map((track) => {
    track.duration = track.duration.toString();
    if (track.duration.length <= 3) {
      track.duration = track.duration + '0';
    }
    return track;
  });

  const filteredItems = tableRows.filter(
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
    <Card className="h-full rounded-none w-full max-w-[35%] bg-black/[0.9] fixed z-20 overflow-scroll">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none h-[45px] mb-4 bg-transparent"
      >
        <div className="flex flex-col my-5  items-center ">
          <div className="fixed ml-[0.40rem] w-3/12   top-7">
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
      <table className="w-full mt-3  table-auto text-left">
        <thead>
          <tr>
            {tableHeaders.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-black/[0.9]  p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none text-white opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(({ path, title, artist, album, duration }, index) => {
            const isLast = index === tableRows.length - 1;
            const classes = isLast ? 'p-2' : 'p-2 border-b border-blue-gray-50';
            return (
              <tr key={path}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal truncate w-[100px] text-white  "
                  >
                    {title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal  w-[100px]  text-white"
                  >
                    {artist}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal w-[100px] text-white"
                  >
                    {album}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal w-[100px] pl-4 text-white"
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

export default SongMenuCard;
