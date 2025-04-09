'use client';

import { Box, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import Button from './Button';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginWithGoogle, clearError } from '../store/features/authSlice';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  
  const handleGoogleLogin = async () => {
    await dispatch(loginWithGoogle());
  };
  
  if (isAuthenticated) {
    router.push('/dashboard');
  }
  
  return (
    <Card sx={{ maxWidth: { xs: '100%', sm: 400 }, width: '100%', mx: 'auto' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Login
        </Typography>
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            onClose={() => dispatch(clearError())}
          >
            {error}
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Sign in with your Google account to continue
          </Typography>
          
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={loading}
            sx={{ mt: 1, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in with Google'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}