'use client';

import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GavelIcon from '@mui/icons-material/Gavel';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useChat } from '@/contexts/ChatContext';
import { Bot } from 'lucide-react';
import { Sprout } from 'lucide-react';
import { Scale } from 'lucide-react';

export const LandingPageContent = () => {
  const { openChat } = useChat();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        pb: 20,
      }}
    >
      <Container maxWidth='lg'>
        <Stack
          spacing={4}
          alignItems='center'
          textAlign='center'
          sx={{ mb: 8 }}
        >
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.6)',
              display: 'inline-block',
            }}
          >
            <Typography
              variant='overline'
              color='text.secondary'
              fontWeight='bold'
            >
              Agente Inteligente para Startups
            </Typography>
          </Box>

          <Typography
            variant='h1'
            fontWeight='800'
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Tu Mentor Estratégico y Legal
          </Typography>

          <Typography
            variant='h5'
            color='text.secondary'
            sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}
          >
            Combina la filosofía de crecimiento de <strong>Paul Graham</strong>{' '}
            con la normativa oficial de <strong>Chile</strong>. Respuestas
            precisas para construir, legalizar y escalar tu startup.
          </Typography>

          <Button
            variant='contained'
            size='large'
            onClick={openChat}
            startIcon={<Bot color='black' size={30} />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.3rem',
              borderRadius: '50px',
              textTransform: 'none',
              boxShadow: '0 8px 16px rgba(33, 150, 243, 0.3)',
            }}
          >
            COMENZAR CONSULTA
          </Button>
        </Stack>

        <Grid
          container
          spacing={4}
          justifyContent='center'
          alignItems='stretch'
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                transition: '0.3s',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Sprout color='#21CBF3' size={50} />
                <Typography variant='h6' fontWeight='bold' gutterBottom>
                  Filosofía de Crecimiento
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Aprende a pensar como los grandes fundadores con ensayos
                  seleccionados.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                transition: '0.3s',

                '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Scale color='#21CBF3' size={50} />
                <Typography variant='h6' fontWeight='bold' gutterBottom>
                  Marco Legal Chileno
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Domina la Ley de "Empresa en un día" y los requisitos
                  normativos locales.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
