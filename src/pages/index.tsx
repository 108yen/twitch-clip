import { usersAtom } from '@/components/Atoms';
import { User } from '@/components/types';
import { Box } from '@mui/material';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

export default function Home() {
  const [users, setUsers] = useAtom(usersAtom);
  const didLogRef = useRef(false);

  useEffect(() => {
    async function fetchUsers() {
      const res = await axios.get<Array<User>>('/api/streamers')
        .catch((error) => console.log('api fetch error'));
      if (res?.data!=null) {
        setUsers(res?.data);
      }
    }
    if (didLogRef.current===false) {
      didLogRef.current = true;
      console.log('useeffect');
      fetchUsers();
    }
  }, []);

  return (
    <>
      {users.map(e=>e.display_name)}
    </>
  );
}
