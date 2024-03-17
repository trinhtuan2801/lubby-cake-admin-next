'use client';

import Box from '@mui/joy/Box';
import { Typography } from '@mui/joy';
import DeployButton from '../../components/pages/data/DeployButton';
import DeleteUnusedImagesButton from '../../components/pages/data/DeleteUnusedImagesButton';

export default function DataPage() {
  return (
    <>
      <Typography level='title-md' color='primary' fontWeight='bold'>
        Dữ liệu
      </Typography>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        gap={1}
      >
        <DeleteUnusedImagesButton />
        <DeployButton />
      </Box>
    </>
  );
}
