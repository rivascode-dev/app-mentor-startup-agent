import { useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
}

interface ChatWidgetThreadProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatWidgetThread = ({ messages, isLoading }: ChatWidgetThreadProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      component='main'
      sx={{
        flex: '1 1 auto',
        overflowY: 'auto',
        p: 2,
        backgroundColor: 'grey.100',
      }}
    >
      {messages.length === 0 ? (
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ textAlign: 'center', mt: 4 }}
        >
          ¡Empieza la conversación!
        </Typography>
      ) : (
        messages.map(({ id, role, content }) => (
          <Box key={id}>
            <Box sx={{ mb: 2, textAlign: role === 'user' ? 'right' : 'left' }}>
              <Typography
                variant='subtitle1'
                sx={{
                  display: 'inline-block',
                  bgcolor: role === 'user' ? 'primary.main' : 'white',
                  color: role === 'user' ? 'primary.contrastText' : 'text.primary',
                  borderRadius: 2,
                  lineHeight: 1.5,
                  px: 2,
                  py: 1,
                }}
              >
                {content}
              </Typography>
            </Box>
          </Box>
        ))
      )}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <CircularProgress size={20} />
        </Box>
      )}
      <div ref={messagesEndRef} />
    </Box>
  );
};
