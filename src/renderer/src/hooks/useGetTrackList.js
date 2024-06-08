import { useCallback, useState, useEffect } from 'react';
import { readFile } from '../API/windowAPIs';
import { useQuery } from 'react-query';

function useGetTrackList() {
  const [tracksList, setTracksList] = useState([]);
  const getTrackList = useCallback(async () => {
    const list = await readFile();
    return list;
  }, [tracksList]);
  const { data, status, error } = useQuery({
    queryKey: ['getTrackList'],
    queryFn: getTrackList,
    refetchOnWindowFocus: false
  });
  useEffect(() => {
    if (status === 'success') {
      setTracksList(data);
    }
  }, [status]);

  return { tracksList: tracksList, setTracksList: setTracksList, error: error, status: status };
}
export { useGetTrackList };
