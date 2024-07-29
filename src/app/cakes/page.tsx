import { GlobalStyles, Typography } from '@mui/joy';

import { CssVar } from '@/constants';
import CakeTable from '@/components/pages/cakes/CakeTable/CakeTable';

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

      <Typography level='title-md' fontWeight='bold'>
        Danh sách bánh
      </Typography>
      <CakeTable />
    </>
  );
}
