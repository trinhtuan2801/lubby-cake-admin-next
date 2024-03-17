import { Button } from '@mui/joy';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Box
      height='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Typography color='primary' level='title-lg'>
        Trang không tồn tại
      </Typography>
      <Link href='/'>
        <Button sx={{ mt: 1 }}>Quay về trang chủ</Button>
      </Link>
    </Box>
  );
}
