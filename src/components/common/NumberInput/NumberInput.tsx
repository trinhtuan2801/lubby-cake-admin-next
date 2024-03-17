import { numberWithCommas } from '@/utils/string-utils';
import { Input, InputProps } from '@mui/joy';
import { useEffect, useState } from 'react';

export interface NumberInputProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  value?: number | null;
  onChange?: (value: number | null) => void;
}

export default function NumberInput({
  value: parentValue,
  onChange: parentOnChange,
  ...props
}: NumberInputProps) {
  const [value, setValue] = useState(parentValue ?? null);

  useEffect(() => {
    if (parentValue !== undefined) setValue(parentValue);
  }, [parentValue]);

  const onChange = (value: number | null) => {
    if (parentOnChange) {
      parentOnChange(value);
    } else {
      setValue(value);
    }
  };

  return (
    <Input
      value={numberWithCommas(value)}
      onChange={(e) => {
        const numStr = e.target.value.replace(/\./g, '');
        if (!numStr.length) {
          if (parentOnChange) onChange(null);
          return;
        }
        const num = Number(numStr);
        if (!isNaN(num)) onChange(num);
      }}
      {...props}
    />
  );
}
