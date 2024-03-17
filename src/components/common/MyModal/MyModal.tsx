import {
  Box,
  Button,
  ButtonProps,
  Modal,
  ModalClose,
  ModalDialog,
  ModalProps,
  Typography,
} from '@mui/joy';
import { PropsWithChildren, ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  ModalProps?: Partial<ModalProps>;
  footer?: ReactNode;
  onOk?: () => void;
  OkButtonLabel?: string;
  OkButtonProps?: ButtonProps;
  onCancel?: () => void;
  CancelButtonLabel?: string;
  CancelButtonProps?: ButtonProps;
}

export default function MyModal({
  open,
  onClose,
  children,
  title = '',
  ModalProps,
  OkButtonLabel,
  OkButtonProps,
  CancelButtonLabel,
  CancelButtonProps,
  onOk,
  onCancel,
}: PropsWithChildren<Props>) {
  return (
    <Modal {...ModalProps} open={open} onClose={onClose}>
      <ModalDialog sx={{ width: 'calc(100vw - 2rem)', maxWidth: '600px' }}>
        <ModalClose />
        <Box minHeight={24}>
          {typeof title === 'object' ? (
            title
          ) : (
            <Typography level='title-md'>{title}</Typography>
          )}
        </Box>
        <Box
          sx={{
            overflowX: 'visible',
            overflowY: 'auto',
            mx: 'calc(-1 * var(--Card-padding))',
            px: 'var(--Card-padding)',
          }}
        >
          {children}
        </Box>
        <Box display='flex' justifyContent='flex-end' columnGap={1} mt={1}>
          {!!onOk && (
            <Button {...OkButtonProps} onClick={onOk}>
              {OkButtonLabel ?? 'Ok'}
            </Button>
          )}
          <Button
            variant='outlined'
            color='neutral'
            {...CancelButtonProps}
            onClick={() => {
              if (onCancel) onCancel();
              else onClose();
            }}
          >
            {CancelButtonLabel ?? 'Hủy'}
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
