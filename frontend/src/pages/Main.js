import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMarathonDetailsQuery } from '../slices/marathonApiSlice';

function Main() {
  const { marathonId } = useParams();

  const { data: marathonData, refetch: refetchMarathon } =
    useGetMarathonDetailsQuery({ marathonId });

  useEffect(() => {}, []);

  return <div>MAIN</div>;
}

export default Main;
