'use client';
import { Box, Typography, LinearProgress } from '@mui/material';

interface VoiceRecordingIndicatorProps {
  isVisible: boolean;
}

export const VoiceRecordingIndicator = ({ isVisible }: VoiceRecordingIndicatorProps) => {
  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: -60,
        left: 0,
        right: 0,
        backgroundColor: 'error.light',
        color: 'white',
        p: 1,
        borderRadius: 1,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 3,
      }}
    >
      <Typography
        variant='body2'
        fontWeight='bold'
      >
        Escuchando...
      </Typography>
      <LinearProgress
        color='inherit'
        sx={{ width: '100%', mt: 0.5 }}
      />
    </Box>
  );
};
