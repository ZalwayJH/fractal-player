import { useCallback, useState, useEffect } from 'react';
import { readFile } from '../API/windowAPIs';
import { useQuery } from 'react-query';

export function useGetTrackList() {
  const [tracks, setTracks] = useState([]);
  const getTrackList = useCallback(async () => {
    const list = await readFile();

    return list;
  }, [tracks]);
  const { data, status, error } = useQuery({
    queryKey: ['getTrackList'],
    queryFn: getTrackList,
    refetchOnWindowFocus: false
  });
  useEffect(() => {
    if (status === 'success') {
      setTracks(data);
    }
  }, [status]);
  if (error) {
    throw new Error(error.message);
  }

  return { tracks: tracks, setTracks: setTracks, status: status };
}
