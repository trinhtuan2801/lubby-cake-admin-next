import { Box, BoxProps } from '@mui/joy';

interface Props {
  visible: boolean;
  bgLightMode?: string;
  bgDarkMode?: string;
  BoxProps?: BoxProps;
}

export default function Cover({
  bgDarkMode = 'black',
  bgLightMode = 'light',
  visible: isShow,
  BoxProps,
}: Props) {
  return (
    <Box
      position='absolute'
      top={0}
      left={0}
      width='100%'
      height='100%'
      bgcolor={(theme) =>
        theme.palette.mode === 'light' ? bgLightMode : bgDarkMode
      }
      display={isShow ? 'block' : 'none'}
      sx={{ opacity: 0.5 }}
      {...BoxProps}
    />
  );
}
