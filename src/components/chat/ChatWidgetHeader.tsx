import { Avatar, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AssistantIcon from '@mui/icons-material/Assistant';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface ChatWidgetHeaderProps {
  onClose: () => void;
}

export const ChatWidgetHeader = ({ onClose }: ChatWidgetHeaderProps) => {
  return (
    <Box sx={{ p: 1, backgroundColor: 'white', borderBottom: '1px solid', borderColor: 'grey.300' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <IconButton
          onClick={onClose}
          size='small'
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ px: 1, display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <AutoAwesomeIcon sx={{ color: 'white',  }} />
        </Avatar>
        <Box>
          <Typography
            variant='subtitle2'
            fontWeight='bold'
          >
            AGENTE DE IA
          </Typography>
          <Typography
            variant='caption'
            color='text.secondary'
          >
            Normalmente responde instantáneamente
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
