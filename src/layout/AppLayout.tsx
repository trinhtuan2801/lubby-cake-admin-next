'use client';

import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';

import { CssVar } from '@/constants';
import ThemeRegistry from '@/theme/ThemeRegistry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import MyToastContainer from '@/components/common/MyToastContainer/MyToastContainer';
import firebaseServices from '@/firebase/services';
import { getUserData } from '@/api/user';
import useUserInfo from '@/zustand/useUserInfo';
import { CircularProgress } from '@mui/joy';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const { auth } = firebaseServices;
export default function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [isCheckedAuth, setIsCheckedAuth] = useState(false);
  const { setUserData } = useUserInfo();
  const router = useRouter();
  const isLoginPage = pathname === '/login';

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await getUserData(user);
        setUserData(userData);
        if (!userData?.roles?.admin) {
          router.replace('/login');
        }
      } else {
        router.replace('/login');
      }
      setIsCheckedAuth(true);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeRegistry options={{ key: 'joy' }}>
        <CssBaseline />
        <MyToastContainer />
        {!isCheckedAuth ? (
          <Box
            height='100vh'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            {!isLoginPage && (
              <>
                <AppHeader />
                <AppSidebar />
              </>
            )}
            <Box
              sx={{
                px: { xs: 2, md: 6 },
                pt: {
                  xs: `calc(12px + var(${CssVar.HEADER_HEIGHT}))`,
                  md: 3,
                },
                pb: 2,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '100dvh',
                gap: 1,
                overflow: 'auto',
              }}
            >
              <Box
                display='flex'
                flexGrow={1}
                flexDirection='column'
                alignItems='center'
              >
                <Box
                  display='flex'
                  flexDirection='column'
                  gap={1}
                  maxWidth={`var(${CssVar.PAGE_WIDTH} , 800px)`}
                  width='100%'
                  flexGrow={1}
                >
                  {children}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </ThemeRegistry>
    </QueryClientProvider>
  );
}
