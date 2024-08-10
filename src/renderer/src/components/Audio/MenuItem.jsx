import { Suspense } from 'react';
import { LoadingSongs } from './LoadingSongs';

export const MenuItem = ({ title, artist, album, duration, albumCover }) => {
  return (
    <Suspense fallback={<LoadingSongs />}>
      <div className="w-full rounded-md  px-2 p-1 items-center text-gray-400  font-semibold inline-grid  gap-4">
        <div className="w-[40px] col-start-1 rounded-md h-[40px] min-h-[40px] min-w-[40px] bg-black/[0.5]">
          <img src={albumCover} width="40" height="40" className="object-cover rounded-sm" />
        </div>
        <span className="col-start-2  truncate w-[15em]">
          <h3 className="text-white  truncate ">{title}</h3>
          <h4 className="text-gray-400 truncate">{artist}</h4>
        </span>
        <h4 className="col-start-3 text-wrap w-[8em] truncate ">{album}</h4>
        <p className="col-start-4 pr-3">{duration}</p>
      </div>
    </Suspense>
  );
};
