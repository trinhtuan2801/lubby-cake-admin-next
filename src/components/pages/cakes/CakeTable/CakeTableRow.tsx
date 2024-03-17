import { Cake, deleteCake } from '@/api/cake';
import { QUERY_KEY } from '@/api/queryKeys';
import MyModal from '@/components/common/MyModal/MyModal';
import { numberWithCommas } from '@/utils/string-utils';
import {
  DeleteForever,
  Edit,
  ExpandMoreOutlined,
  MoreVertOutlined,
} from '@mui/icons-material';
import {
  AspectRatio,
  Box,
  Chip,
  Dropdown,
  IconButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CakeModal from './CakeModal/CakeModal';
import { AgeStr, GenderStr } from '@/constants';
import Image from 'next/image';

interface CakeTableRowProps extends Cake {}

export default function CakeTableRow(props: CakeTableRowProps) {
  const { id, name, images, prices, desc, categories, gender, age } = props;
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isExpandDesc, setIsExpandDesc] = useState(false);

  const deleteCakeMT = useMutation({
    mutationFn: () => deleteCake(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.Cakes],
      });
      setOpenDelete(false);
    },
    onError: () => {
      toast.error('Lỗi khi xóa');
    },
  });

  return (
    <>
      <Box
        bgcolor='background.level1'
        borderRadius={6}
        pt={0.5}
        pb={1}
        display='flex'
      >
        <Box mt={0.5} ml={1}>
          {images[0] && (
            <AspectRatio ratio='1' sx={{ width: 50, borderRadius: 6 }}>
              <Image
                alt='cake image'
                width={50}
                height={50}
                sizes='50px'
                src={images[0]}
                quality={100}
                style={{ objectFit: 'cover' }}
              />
            </AspectRatio>
          )}
        </Box>
        <Box ml={1} flexGrow={1} overflow='hidden'>
          <Box overflow='auto'>
            <Typography
              level='body-sm'
              sx={{
                whiteSpace: 'nowrap',
              }}
              fontWeight='bold'
              color='primary'
            >
              {name}
            </Typography>
            <Box>
              {prices.map(({ size, price, oldPrice, id }) => (
                <Box key={id} display='flex' gap={1}>
                  <Typography level='body-sm' fontWeight='bold'>
                    {size}
                  </Typography>
                  <Typography level='body-sm' color='success'>
                    {numberWithCommas(price)}đ
                  </Typography>
                  {!!oldPrice && (
                    <Typography level='body-sm'>
                      ({numberWithCommas(oldPrice)}đ)
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          <Box display='flex' gap={0.5} flexWrap='wrap' mt={0.5}>
            {gender !== null && (
              <Chip variant='outlined' color='primary' size='sm'>
                {GenderStr[gender]}
              </Chip>
            )}
            {age !== null && (
              <Chip variant='outlined' color='primary' size='sm'>
                {AgeStr[age]} tuổi
              </Chip>
            )}
            {categories.map((cate) => (
              <Chip key={cate.id} variant='outlined' color='primary' size='sm'>
                {cate.name}
              </Chip>
            ))}
          </Box>
          {isExpandDesc && (
            <Typography level='body-sm' mt={0.5}>
              {desc}
            </Typography>
          )}
        </Box>
        <Box
          flexShrink={0}
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          pr={0.5}
        >
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { size: 'sm' } }}
            >
              <MoreVertOutlined />
            </MenuButton>
            <Menu placement='bottom-end'>
              <MenuItem onClick={() => setOpenEdit(true)}>
                <ListItemDecorator>
                  <Edit />
                </ListItemDecorator>{' '}
                Sửa
              </MenuItem>
              <MenuItem color='danger' onClick={() => setOpenDelete(true)}>
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <DeleteForever />
                </ListItemDecorator>{' '}
                Xóa
              </MenuItem>
            </Menu>
          </Dropdown>
          {!!desc && (
            <IconButton
              size='sm'
              onClick={() => setIsExpandDesc((prev) => !prev)}
            >
              <ExpandMoreOutlined
                sx={{
                  rotate: isExpandDesc ? '180deg' : '0deg',
                  transition: 'rotate 0.2s ease-out',
                }}
              />
            </IconButton>
          )}
        </Box>
      </Box>
      <MyModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        title='Xóa'
        OkButtonLabel='Xóa'
        OkButtonProps={{
          color: 'danger',
          loading: deleteCakeMT.isPending,
        }}
        onOk={() => {
          deleteCakeMT.mutate();
        }}
      >
        <Typography>
          Bạn muốn xóa:&nbsp;
          <Typography
            component='span'
            color='danger'
            sx={{ display: 'inline-block' }}
          >
            {name}
          </Typography>
          &nbsp;?
        </Typography>
      </MyModal>
      <CakeModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        initData={props}
      />
    </>
  );
}
