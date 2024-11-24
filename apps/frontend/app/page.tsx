"use client";
import Image from "next/image";
import { Container, Box, Typography, Button, Paper } from "@mui/material";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { clearUser } from "./store/features/authSlice";
import { useRouter } from "next/navigation";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignOut = () => {
    dispatch(clearUser());
    router.push("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mx: 'auto' }}>
        <Image
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js Logo"
          width={120}
          height={25}
          priority
          className="dark:invert mb-6"
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Your Dashboard
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          A secure and efficient way to manage your applications
        </Typography>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        {user ? (
          <Box>
            <Typography variant="h6" gutterBottom>
              Hello, {user.name || 'User'}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              {user.email}
            </Typography>
            <Typography variant="body2" sx={{ mb: 4 }}>
              You're currently signed in. Use the dashboard to manage your account and access your applications.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSignOut}
              fullWidth
            >
              Sign Out
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" gutterBottom>
              Get Started
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Sign in to access your personalized dashboard and manage your applications securely.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/login"
              fullWidth
            >
              Sign In
            </Button>
          </Box>
        )}
      </Paper>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<GitHubIcon />}
          sx={{ textTransform: 'none' }}
        >
          View on GitHub
        </Button>
      </Box>
    </Container>
  );
}
