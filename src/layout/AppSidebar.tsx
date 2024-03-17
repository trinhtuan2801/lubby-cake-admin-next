'use client';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import ColorSchemeToggle from '@/components/common/ColorSchemeToggle/ColorSchemeToggle';
import { CssVar, SidebarTabs } from '@/constants';
import firebaseServices from '@/firebase/services';
import { GlobalStyles } from '@mui/joy';
import { closeSidebar } from './layoutUtils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useUserInfo from '@/zustand/useUserInfo';

const { auth } = firebaseServices;
export default function AppSidebar() {
  const { userData } = useUserInfo();
  const pathname = usePathname();

  return (
    <Sheet
      className='Sidebar'
      sx={{
        position: { xs: 'fixed', sm: 'sticky' },
        transform: {
          xs: `translateX(calc(100% * (var(${CssVar.SIDE_NAVIGATION_SLIDE_IN}, 0) - 1)))`, // -100% or 0
          sm: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 1100,
        height: '100dvh',
        width: `var(${CssVar.SIDEBAR_WIDTH})`,
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={{
          ':root': {
            [CssVar.SIDEBAR_WIDTH]: '220px',
          },
        }}
      />
      <Box
        className='Sidebar-overlay'
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: `var(${CssVar.SIDE_NAVIGATION_SLIDE_IN})`,
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: `translateX(calc(100% * (var(${CssVar.SIDE_NAVIGATION_SLIDE_IN}, 0) - 1) + var(${CssVar.SIDE_NAVIGATION_SLIDE_IN}, 0) * var(${CssVar.SIDEBAR_WIDTH}, 0px)))`,
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level='title-lg'>Lubby Cake</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size='sm'
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          {SidebarTabs.map(({ Icon, name, path }) => {
            const isSelected = path === pathname;
            return (
              <Link href={path} key={path} onClick={closeSidebar}>
                <ListItem>
                  <ListItemButton selected={isSelected}>
                    <Icon />
                    <ListItemContent>
                      <Typography level='title-sm'>{name}</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar variant='outlined' size='sm' src={userData?.photoURL ?? ''} />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level='title-sm'>{userData?.displayName}</Typography>
          <Typography level='body-xs'>
            {userData?.email?.split('@')[0]}
          </Typography>
        </Box>
        <IconButton
          size='sm'
          variant='plain'
          color='neutral'
          onClick={() =>
            auth.signOut().then(() => (window.location.href = '/login'))
          }
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
