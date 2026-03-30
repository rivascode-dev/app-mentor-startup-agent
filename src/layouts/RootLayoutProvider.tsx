'use client';
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { ChatProvider } from '@/contexts/ChatContext';

import Footer from '@/layouts/Footer';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#35daee', // Matching Landing Page blue
    },
    secondary: {
      main: '#3979ed', // Matching Landing Page blue
    },
  },
});

interface RootLayoutProviderProps {
  children: ReactNode;
}

const RootLayoutProvider = ({ children }: RootLayoutProviderProps) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ChatProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
          <ChatWidget />
        </ChatProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default RootLayoutProvider;
