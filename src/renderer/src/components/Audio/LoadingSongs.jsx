import { Typography } from '@material-tailwind/react';
export const LoadingSongs = () => {
  return (
    <div className="max-w-full mt-2 animate-pulse grid grid-cols-2 grid-rows-2 ">
      <Typography
        as="div"
        className="row-span-2 col-start-1  ml-3 row-start-1 h-7 w-7 rounded-full bg-gray-100 mt-2"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className=" ml-12 h-1 w-9/12 col-span-2 rounded-full row-start-1 col-start-1 bg-gray-100"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-8 ml-12 h-1 w-7/12 col-span-2 rounded-full row-start-2 col-start-1 bg-gray-100"
      >
        &nbsp;
      </Typography>
    </div>
  );
};
