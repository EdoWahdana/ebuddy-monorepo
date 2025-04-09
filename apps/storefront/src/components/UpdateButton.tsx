'use client';

import { useState } from 'react';
import { Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@mui/material';
import Button from './Button';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateUser } from '../store/features/userSlice';

interface UpdateButtonProps {
  userId: string;
  onUpdate: (success: boolean, error: string | null, name: string) => void;
  showStatus: boolean;
  statusSuccess?: boolean;
  statusError?: string | null;
}

export default function UpdateButton({ userId, onUpdate, showStatus, statusSuccess, statusError }: UpdateButtonProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
  };
  
  const handleUpdateUser = async () => {
    if (name.trim()) {
      try {
        await dispatch(updateUser({ userId, userData: { name } }));
        onUpdate(true, null, name);
      } catch (error) {
        onUpdate(false, error instanceof Error ? error.message : 'Unknown error', name);
      }
      handleClose();
    }
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpen}
        disabled={loading}
      >
        Update User Data
      </Button>
      
      {showStatus && (
        <Typography 
          color={statusSuccess ? "success.main" : "error"} 
          variant="body2"
          sx={{ mt: 1 }}
        >
          {statusSuccess 
            ? "User updated successfully!" 
            : `Error: ${statusError}`
          }
        </Typography>
      )}
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleUpdateUser} 
            disabled={loading || !name.trim()}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}