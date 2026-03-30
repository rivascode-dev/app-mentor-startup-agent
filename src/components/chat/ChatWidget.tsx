'use client';
import { Fab, Fade, Paper, Typography } from '@mui/material';
import { ChatWidgetContainer } from '@/components/chat/ChatWidgetContainer';
import { useChat } from '@/contexts/ChatContext';
import { Bot } from 'lucide-react';
import { CircleX } from 'lucide-react';

export const ChatWidget = () => {
  const { isOpen, toggleChat } = useChat();

  return (
    <>
      {/* Ventana del Chat */}
      <Fade in={isOpen}>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: { xs: 170, md: 90 },
            right: { xs: '5%', md: '2%' },
            width: { xs: '90%', md: '45%' },
            height: { xs: '80vh', md: '85vh' },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            overflow: 'hidden',
            zIndex: 1300,
          }}
        >
          <ChatWidgetContainer onClose={toggleChat} />
        </Paper>
      </Fade>

      {/* Botón Flotante */}
      {!isOpen && (
        <Fab
          variant='extended'
          color='primary'
          aria-label='Agente RAG'
          onClick={toggleChat}
          sx={{
            position: 'fixed',
            padding: { xs: 2, md: 4 }, // Keeping larger padding as per original widget style or adjusting to match? User said "mismo icono y forma". Landing page has py: 1.5, px: 4.
            // Let's match shape (borderRadius 50 is default for extended Fab essentially, but let's be explicit if needed).
            // Landing page button: borderRadius: '50px', boxShadow: '0 8px 16px rgba(33, 150, 243, 0.3)'
            bottom: { xs: 110, md: 20 },
            right: 16,
            zIndex: 1301,
            borderRadius: '50px',
            boxShadow: '0 8px 16px rgba(33, 150, 243, 0.3)',
            textTransform: 'none', // Landing page button has this
          }}
        >
          {isOpen ? (
            <CircleX color='black' size={30} style={{ marginRight: '10px' }} />
          ) : (
            <Bot color='black' size={30} style={{ marginRight: '10px' }} />
          )}
          <Typography
            variant='button' // Match button text style roughly
            color='black'
            sx={{ fontSize: '1.2rem', fontWeight: 500, mt: 0.5 }}
          >
            agente estrategico
          </Typography>
        </Fab>
      )}
    </>
  );
};
