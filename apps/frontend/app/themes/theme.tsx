"use client"

import { ThemeProvider, createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import { useMemo } from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        typography: {
          fontFamily: "var(--font-geist-sans)",
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}