import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../zustand/store';
import { useQuery } from '@tanstack/react-query';
import { self } from '../http/api/auth.api';
import { useEffect } from 'react';

const Root = () => {
  const { setUser } = useAuthStore();

  const getSelf = async () => {
    const { data } = await self();
    console.log(data, 'data   dddddddddddd');
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return <Outlet />;
};

export default Root;
