import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { Bot } from 'lucide-react';
import { CircleX } from 'lucide-react';

interface ChatWidgetHeaderProps {
  onClose: () => void;
}

export const ChatWidgetHeader = ({ onClose }: ChatWidgetHeaderProps) => {
  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'grey.300',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton onClick={onClose} size='small'>
          <CircleX color='black' size={30} />
        </IconButton>
      </Box>
      <Box sx={{ px: 1, display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <Bot color='white' size={30} />
        </Avatar>
        <Box>
          <Typography variant='subtitle2' fontWeight='bold'>
            TU MENTOR ESTRATEGICO
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Respuestas precisas para construir, legalizar y escalar tu startup.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
