'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';

const Footer = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Box
      component='footer'
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth='lg'>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent='space-between'
          alignItems='center'
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link
              href='https://rivascode.dev'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src='/assets/logo-rivascode-small.png'
                alt='Rivasvode Logo'
                width={isMobile ? 150 : 200}
                height={isMobile ? 30 : 35}
                style={{ borderRadius: '8px' }}
              />
            </Link>
            <Typography variant='body2' color='text.secondary' fontWeight='500'>
              {'© '}
              {new Date().getFullYear()}
              {' | '} All rights reserved
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
