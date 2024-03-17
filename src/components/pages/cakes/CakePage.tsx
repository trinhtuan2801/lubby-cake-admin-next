import { GlobalStyles, Typography } from '@mui/joy';
import CakeTable from './CakeTable/CakeTable';
import { CssVar } from '@/constants';

export default function CakePage() {
  return (
    <>
      <GlobalStyles
        styles={{
          ':root': {
            [CssVar.PAGE_WIDTH]: '800px',
          },
        }}
      />

      <Typography level='title-md' color='primary' fontWeight='bold'>
        Danh sách bánh
      </Typography>
      <CakeTable />
    </>
  );
}
