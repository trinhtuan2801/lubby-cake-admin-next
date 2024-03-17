'use client';

import { getUserData } from '@/api/user';
import firebaseServices from '@/firebase/services';
import { Button, Input, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-toastify';
import GoogleIcon from '@/assets/svg/google.svg';
import { useMutation } from '@tanstack/react-query';
import useUserInfo from '@/zustand/useUserInfo';
import { useRouter } from 'next/navigation';
const { auth, provider } = firebaseServices;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useUserInfo();
  const router = useRouter();

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: (method: 'email' | 'google') => {
      switch (method) {
        case 'email':
          return signInWithEmailAndPassword(auth, email, password);
        case 'google':
          return signInWithPopup(auth, provider);
      }
    },
    onSuccess: async ({ user }) => {
      const userData = await getUserData(user);
      if (!userData || !userData.roles.admin) throw new Error();
      setUserData(userData);
      router.replace('/');
    },
    onError: () => {
      auth.signOut();
      toast.error('Không phải tài khoản admin');
    },
  });

  return (
    <Box height='100vh' display='flex' justifyContent='center' p={4}>
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
        maxWidth='400px'
        width='100%'
      >
        <Typography level='h2' textAlign='center' color='primary'>
          Lubby Cake
        </Typography>
        <Box display='flex' flexDirection='column' gap={1} mt={2}>
          <Input
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='Mật khẩu'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') signIn('email');
            }}
            type='password'
          />
          <Button
            variant='solid'
            onClick={() => {
              signIn('email');
            }}
            fullWidth
            disabled={!email || !password || isPending}
          >
            Đăng nhập
          </Button>
        </Box>
        <Typography textAlign='center' color='neutral' level='body-sm'>
          hoặc
        </Typography>
        <Button
          startDecorator={<GoogleIcon />}
          color='primary'
          variant='outlined'
          onClick={() => signIn('google')}
          disabled={isPending}
        >
          Đăng nhập với Google
        </Button>
      </Box>
    </Box>
  );
}
