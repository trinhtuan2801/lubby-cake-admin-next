import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import { useColorScheme } from '@mui/joy/styles';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import useIsClient from '@/hooks/useIsClient';

export default function ColorSchemeToggle(props: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const isClient = useIsClient();

  if (!isClient)
    return (
      <IconButton
        size='sm'
        variant='outlined'
        color='neutral'
        {...props}
        disabled
      />
    );
  return (
    <IconButton
      id='toggle-mode'
      size='sm'
      variant='outlined'
      color='neutral'
      {...props}
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'dark' ? <DarkModeRoundedIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
