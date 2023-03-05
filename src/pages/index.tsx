import { clipsAtom, tabAtom, usersAtom } from '@/components/Atoms';
import { Clip, User } from '@/components/types';
import ClipCards from '@/layout/clipCard';
import { AppBar, Button, Grid, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

export default function Home() {
  const [users, setUsers] = useAtom(usersAtom);
  const [clips, setClips] = useAtom(clipsAtom);
  const [tab, setTab] = useAtom(tabAtom);
  const didLogRef = useRef(false);

  function sortByViewconut(clips: Array<Clip>) {
    return clips.sort((a, b) => b.view_count - a.view_count);
  }

  useEffect(() => {
    async function fetchUsers() {
      const res = await axios.get<Array<User>>('/api/streamers')
        .catch((error) => console.log('streamers api fetch error'));
      if (res?.data != null) {
        setUsers(res?.data);
      }
    }
    async function fetchClips() {
      const res = await axios.get<Array<Clip>>('/api/clips')
        .catch((error) => console.log('clips api fetch error'));
      if (res?.data != null) {
        setClips(sortByViewconut(res?.data));
      }
    }
    async function fetch() {
      await fetchUsers();
      await fetchClips();
    }

    if (didLogRef.current === false) {
      didLogRef.current = true;
      fetch();
    }
  }, []);

  function handleTabChange(event: React.SyntheticEvent, newValue: string) {
    setTab(newValue);
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            twitch clip ranking
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container justifyContent='center'>
          <Grid item xs={10}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider',marginBottom:2 }}>
              <Tabs
                value={tab}
                onChange={handleTabChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
              <Tab label='day' value='day' />
              <Tab label='week' value='week' />
              <Tab label='month' value='month' />
              <Tab label='all' value='all' />
            </Tabs>
            </Box>
            <ClipCards clips={clips} users={users} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
