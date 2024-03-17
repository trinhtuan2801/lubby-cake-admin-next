import { CakePrice, CakePriceWithoutId } from '@/api/cake';
import MyModal from '@/components/common/MyModal/MyModal';
import NumberInput from '@/components/common/NumberInput/NumberInput';
import { numberWithCommas } from '@/utils/string-utils';
import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Input, Typography } from '@mui/joy';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
interface Props {
  value: CakePrice;
  onChange: (id: string, newPrice: CakePriceWithoutId) => void;
  onDelete: (id: string) => void;
}

export default function PriceInput({
  value: parentValue,
  onChange,
  onDelete,
}: Props) {
  const { id, ...defaultValues } = parentValue;
  const [isEdit, setIsEdit] = useState(parentValue.size ? false : true);
  const { register, handleSubmit, reset, control } =
    useForm<CakePriceWithoutId>({
      defaultValues,
    });

  const onSubmit: SubmitHandler<CakePriceWithoutId> = (formData) => {
    // eslint-disable-next-line
    console.log('PriceForm', formData);
    onChange(id, {
      size: formData.size,
      price: formData.price,
      oldPrice: formData.oldPrice,
    });
    setIsEdit(false);
  };

  const cancelEdit = () => {
    if (!parentValue.size) {
      onDelete(id);
    } else {
      setIsEdit(false);
      reset(defaultValues);
    }
  };

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box>
        <Typography level='body-sm' fontWeight='bold'>
          {parentValue.size}
        </Typography>
        <Box display='flex' gap={1}>
          <Typography level='body-sm' color='success'>
            {numberWithCommas(parentValue.price)}đ
          </Typography>
          {!!parentValue.oldPrice && (
            <Typography level='body-sm'>
              ({numberWithCommas(parentValue.oldPrice)}đ)
            </Typography>
          )}
        </Box>
      </Box>
      <Box>
        <IconButton variant='plain' size='sm' onClick={() => setIsEdit(true)}>
          <Edit />
        </IconButton>
        <IconButton
          variant='plain'
          size='sm'
          color='danger'
          onClick={() => onDelete(id)}
        >
          <Delete />
        </IconButton>
      </Box>
      <MyModal
        open={isEdit}
        onClose={cancelEdit}
        onOk={handleSubmit(onSubmit)}
        OkButtonLabel='Lưu'
      >
        <Box display='flex' flexDirection='column' gap={1}>
          <Box>
            <Typography level='title-sm' className='required'>
              Cỡ
            </Typography>
            <Input {...register('size', { required: true })} autoFocus />
          </Box>
          <Box display='flex' gap={1}>
            <Box flexGrow={1} flexBasis={0} overflow='hidden'>
              <Typography level='title-sm' className='required'>
                Giá bán
              </Typography>

              <Controller
                control={control}
                name='price'
                render={({ field: { name, onChange, ref, value } }) => (
                  <NumberInput
                    name={name}
                    value={value}
                    onChange={(value) => onChange(value)}
                    color='success'
                    slotProps={{ input: { ref } }}
                  />
                )}
                rules={{
                  required: true,
                }}
              />
            </Box>
            <Box flexGrow={1} flexBasis={0} overflow='hidden'>
              <Typography level='title-sm'>Giá cũ</Typography>
              <Controller
                control={control}
                name='oldPrice'
                render={({ field: { name, onChange, value } }) => (
                  <NumberInput
                    name={name}
                    value={value}
                    onChange={(value) => onChange(value)}
                  />
                )}
              />
            </Box>
          </Box>
        </Box>
      </MyModal>
    </Box>
  );
}
