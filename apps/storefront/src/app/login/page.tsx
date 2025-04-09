'use client';

import { Box, Container } from '@mui/material';
import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <LoginForm />
      </Box>
    </Container>
  );
}