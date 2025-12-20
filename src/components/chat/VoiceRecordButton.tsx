'use client';
import { useEffect } from 'react';
import { IconButton, CircularProgress, Tooltip } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface VoiceRecordButtonProps {
  onTranscriptReady: (transcript: string) => void;
  onRecordingStateChange: (isRecording: boolean) => void;
  disabled?: boolean;
}

export const VoiceRecordButton = ({
  onTranscriptReady,
  onRecordingStateChange,
  disabled = false,
}: VoiceRecordButtonProps) => {
  const { isListening, transcript, error, startListening, stopListening, resetTranscript, hasRecognitionSupport } =
    useSpeechRecognition((isRecording: boolean) => {
      if (onRecordingStateChange) {
        onRecordingStateChange(isRecording);
      }
    });

  useEffect(() => {
    // Cuando se completa la transcripción, enviarla al componente padre
    if (transcript && !isListening) {
      onTranscriptReady(transcript);
      resetTranscript();
    }
  }, [transcript, isListening, onTranscriptReady, resetTranscript]);

  if (!hasRecognitionSupport) {
    return (
      <Tooltip title='Tu navegador no soporta reconocimiento de voz'>
        <span>
          <IconButton
            color='default'
            disabled={true}
            aria-label='Micrófono no soportado'
          >
            <MicOffIcon />
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={isListening ? 'Detener grabación' : 'Hablar para enviar mensaje'}>
      <IconButton
        color={isListening ? 'error' : 'primary'}
        onClick={isListening ? stopListening : startListening}
        disabled={disabled}
        aria-label={isListening ? 'Detener grabación' : 'Iniciar grabación'}
        sx={{
          position: 'relative',
          '&:hover': {
            backgroundColor: isListening ? 'rgba(211, 47, 47, 0.04)' : 'rgba(25, 118, 210, 0.04)',
          },
        }}
      >
        {isListening ? (
          <>
            <MicIcon />
            <CircularProgress
              size={44}
              thickness={2}
              sx={{
                color: 'error.main',
                position: 'absolute',
                top: -2,
                left: -2,
                zIndex: 1,
              }}
            />
          </>
        ) : (
          <MicIcon sx={{ fontSize: '35px' }} />
        )}
      </IconButton>
    </Tooltip>
  );
};
