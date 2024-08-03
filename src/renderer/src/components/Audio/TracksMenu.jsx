import { useState } from 'react';
import { Input } from '@material-tailwind/react';
import { MenuItem } from './MenuItem';
import { useGetTrackList } from '../../hooks/useGetTrackList';
import AddTracks from './AddTracks';
import defaultCover from '../../assets/fractalDefault.png';
function TracksMenu({ setSelectedSong }) {
  const [filterText, setFilterText] = useState('');
  const [hide, setHide] = useState(false);
  const { status, trackData, refetch } = useGetTrackList();

  let tracksList = [];

  const songsAndSelectedSong = {
    songs: [],
    selection: []
  };

  if (status === 'success') {
    tracksList = trackData;
    songsAndSelectedSong.songs = trackData.map((track) => track.path);
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
  let menuSize = '11em';
  if (!hide) {
    menuSize = '18em';
  }
  return (
    <div
      className={`h-11/12 bottom-1 shadow-black  shadow-md bg-[#0c0c0d] top-1 m-2 ml-3 border grid grid-rows-[6em_minmax(1em,_18fr)_${menuSize}]   border-white/[0.2]   select-none rounded-lg xl:w-5/12 max-w-[36rem] lg:w-4/12  md:w-3/12 transition-all ease-in-out duration-100  z-30 fixed`}
    >
      <div className="w-full rounded-t-lg  h-full p-4  pb-0 transition-all border-b border-white/[0.2]  z-40  ease-in-out duration-100 bg-black/[0.9]">
        <Input
          label="Search"
          type="text"
          color="white"
          aria-label="Search Input"
          value={filterText}
          onChange={onFilter}
        />
        <section className="w-full h-10  text-center items-center grid grid-rows-1 text-white  grid-col-4">
          <AddTracks refetch={refetch} />
          <h3 className="col-start-2 row-start-1">sort</h3>
          <h3 className="col-start-3 row-start-1">order</h3>
          <h3 className="col-start-4 row-start-1">delete</h3>
        </section>
      </div>
      <div className="h-full w-full  z-30 overflow-scroll overflow-x-auto">
        <ul className="w-[35em]">
          {filteredItems.map(({ path, title, artist, album, duration, cover }, index) => {
            let albumCover = cover !== null ? `data:image/png;base64, ${cover}` : defaultCover;
            return (
              <li
                key={path}
                onClick={() => {
                  setSelectedSong({
                    songs: filteredItems,
                    selection: [path, title, artist, albumCover]
                  });
                }}
                className="m-2 hover:bg-gray-900 rounded-md cursor-pointer "
              >
                <MenuItem
                  title={title}
                  artist={artist}
                  album={album}
                  duration={duration}
                  albumCover={albumCover}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TracksMenu;
