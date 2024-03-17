import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { toggleSidebar } from './layoutUtils';
import { CssVar } from '@/constants';

export default function AppHeader() {
  return (
    <Sheet
      sx={{
        display: { xs: 'flex', sm: 'none' },
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: `var(${CssVar.HEADER_HEIGHT})`,
        zIndex: 1100,
        px: 1.5,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            [CssVar.HEADER_HEIGHT]: '49px',
            [theme.breakpoints.up('md')]: {
              [CssVar.HEADER_HEIGHT]: '0px',
            },
          },
        })}
      />
      <IconButton
        onClick={() => toggleSidebar()}
        variant='outlined'
        color='neutral'
        size='sm'
      >
        <MenuIcon />
      </IconButton>
    </Sheet>
  );
}
