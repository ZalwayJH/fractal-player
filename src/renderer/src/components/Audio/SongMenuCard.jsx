// import { DataTable } from 'primereact/datatable';
import { useState, useMemo } from 'react';
import {
  Card,
  Typography,
  Input,
  CardHeader,
  TabsHeader,
  Button,
  Tabs
} from '@material-tailwind/react';

function SongMenuCard({ addedTracks }) {
  const [filterText, setFilterText] = useState('');

  const tableRows = addedTracks.map((track) => {
    track.picture = [track.picture];
    track.duration = track.duration.toString().replace('.', ':');
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
  const tableHeaders = ['', 'Title', 'Artist', 'Album', 'Duration'];

  console.log(tableRows);
  return (
    <Card className="h-full rounded-none max-w-[45%]  bg-black/[0.9] absolute z-20 overflow-scroll">
      <CardHeader floated={false} shadow={false} className="rounded-none bg-black/[0.9]">
        <div className="flex flex-col   items-center  justify-between  md:flex-row">
          <div className="w-full  ">
            <Input
              label="Search"
              type="text"
              placeholder="Filter By Name"
              aria-label="Search Input"
              value={filterText}
              onChange={onFilter}
            />
          </div>
        </div>
      </CardHeader>
      <table className="w-full min-w-max table-auto text-left">
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
          {filteredItems.map(({ path, picture, title, artist, album, duration }, index) => {
            const isLast = index === tableRows.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
            return (
              <tr key={path}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal text-white">
                    {'cover'}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal truncate max-w-[150px] text-white  "
                  >
                    {title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal text-white">
                    {artist}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal text-white">
                    {album}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal text-white">
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