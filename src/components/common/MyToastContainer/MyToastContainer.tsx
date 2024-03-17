import { useTheme } from '@mui/joy';
import { ToastContainer } from 'react-toastify';

export default function MyToastContainer() {
  const theme = useTheme();

  return (
    <ToastContainer
      theme={theme.palette.mode}
      autoClose={2000}
      hideProgressBar
    />
  );
}
