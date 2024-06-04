// import React from 'react';

// function TrackList({ track, i }) {
//   const duration = (Math.round((track.duration / 60 + Number.EPSILON) * 100) / 100)
//     .toString()
//     .replace('.', ':');
//   return (
//     <div className="h-0 ">
//       <ul className="bg-blue-300 grid grid-cols-5 place-items-center">
//         <li>image</li>
//         <li>{track.title ? track.title : `placeholder${i}`}</li>
//         <li>{track.artist}</li>
//         <li>{track.album}</li>
//         <li>{duration.length < 4 ? duration + '0' : duration}</li>
//       </ul>
//     </div>
//   );
// }

// export default TrackList;
