import { useState, useEffect } from 'react';
import { readFile } from '../API/windowAPIs';
import { useQuery } from 'react-query';
export function useGetTrackList() {
  const [trackData, setTrackData] = useState([]);

  const getTrackList = async () => {
    const list = await readFile();
    return list;
  };

  const { data, status, error, refetch } = useQuery({
    queryKey: ['getTrackList'],
    queryFn: getTrackList,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (status === 'success') {
      setTrackData(data);
    }
  }, [status, data]);

  return {
    error: error,
    status: status,
    refetch: refetch,
    trackData: trackData
  };
}
