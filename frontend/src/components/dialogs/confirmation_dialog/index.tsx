import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { ConfirmationDialogProps } from '../../../models/DialogModel';


const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onConfirm, onClose, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar remoção</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
        {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
