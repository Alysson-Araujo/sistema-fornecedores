export interface ConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  message: string;
}
