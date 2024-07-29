import { revalidateCake } from '@/actions/cakeActions';
import { Backup } from '@mui/icons-material';
import { Button } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function DeployButton() {
  const deployMT = useMutation({
    mutationFn: async () => revalidateCake(),
    onSuccess: (data) => {
      if ('error' in data) return Promise.reject();
      toast.success('Cập nhật dữ liệu thành công');
    },
    onError: () => {
      toast.error('Có lỗi khi cập nhật');
    },
  });

  return (
    <Button
      startDecorator={<Backup />}
      onClick={() => deployMT.mutate()}
      disabled={deployMT.isPending}
      color='primary'
    >
      Cập nhật dữ liệu bánh
    </Button>
  );
}
