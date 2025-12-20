import { useState } from 'react';
import { Box, Button, CircularProgress, TextField, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { VoiceRecordButton } from './VoiceRecordButton';
import { VoiceRecordingIndicator } from './VoiceRecordingIndicator';

interface ChatWidgetComposerProps {
  onSend: (message: string) => Promise<void>;
  isLoading: boolean;
}

export const ChatWidgetComposer = ({ onSend, isLoading }: ChatWidgetComposerProps) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      await onSend?.(message);
      setMessage('');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = (transcript: string) => {
    if (transcript.trim()) {
      onSend?.(transcript);
    }
  };

  const handleVoiceRecordingStateChange = (isRecording: boolean) => {
    setIsRecording(isRecording);
  };

  return (
    <Box sx={{ backgroundColor: 'grey.100', borderTop: '1px solid', borderColor: 'grey.300', position: 'relative' }}>
      <VoiceRecordingIndicator isVisible={isRecording} />
      <Box sx={{ display: 'flex', gap: 1, px: 2, py: 1 }}>
        <TextField
          fullWidth
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={isRecording ? 'Escuchando...' : 'Escribe tu consulta o pulsa el micrófono para hablar...'}
          multiline
          minRows={1}
          maxRows={4}
          size='medium'
          sx={{
            backgroundColor: 'white',
            '& .MuiInputBase-input': {
              fontSize: '1rem',
              lineHeight: '1.5rem',
            },
          }}
          disabled={isLoading || isRecording}
        />

        <Stack
          direction='row'
          spacing={1}
        >
          <VoiceRecordButton
            onTranscriptReady={handleVoiceInput}
            onRecordingStateChange={handleVoiceRecordingStateChange}
            disabled={isLoading}
          />
          <Button
            variant='contained'
            onClick={handleSend}
            disabled={!message.trim() || isLoading || isRecording}
            size='large'
            startIcon={
              isLoading ? (
                <CircularProgress
                  size={20}
                  color='inherit'
                />
              ) : (
                <SendIcon />
              )
            }
          >
            Enviar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
