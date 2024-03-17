import { deleteUnusedImages } from '@/firebase/utils';
import { HideImageOutlined } from '@mui/icons-material';
import { Button } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function DeleteUnusedImagesButton() {
  const deleteUnusedImagesMT = useMutation({
    mutationFn: () => deleteUnusedImages(),
    onSuccess: () => {
      toast.success('Đã xóa thành công');
    },
    onError: () => {
      toast.error('Có lỗi khi xóa ảnh');
    },
  });

  return (
    <Button
      startDecorator={<HideImageOutlined />}
      onClick={() => deleteUnusedImagesMT.mutate()}
      loading={deleteUnusedImagesMT.isPending}
    >
      Xóa ảnh không dùng
    </Button>
  );
}
