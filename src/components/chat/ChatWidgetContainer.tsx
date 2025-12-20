'use client';
import { useState } from 'react';
import { Box } from '@mui/material';
import { ChatWidgetHeader } from './ChatWidgetHeader';
import { ChatWidgetThread } from './ChatWidgetThread';
import { ChatWidgetComposer } from './ChatWidgetComposer';
import { useChatMessages } from '@/hooks/useChatMessages';
import { sendChatRequest } from '@/app/actions/chat';

interface ChatWidgetContainerProps {
  onClose: () => void;
}

export const ChatWidgetContainer = ({ onClose }: ChatWidgetContainerProps) => {
  const { messages, addUserQuestion, addChatResponse } = useChatMessages();
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (userQuestion: string) => {
    if (!userQuestion.trim() || isLoading) return;

    try {
      setIsLoading(true);
      addUserQuestion(userQuestion);

      const response = await sendChatRequest(userQuestion);

      addChatResponse(response.text || response.systemResponse);
    } catch (error) {
      console.error('❌ Error en envío de chat:', (error as Error).message);
      addChatResponse('Lo siento, hubo un error procesando tu consulta. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <ChatWidgetHeader onClose={onClose} />
      <ChatWidgetThread
        messages={messages}
        isLoading={isLoading}
      />
      <ChatWidgetComposer
        onSend={handleSend}
        isLoading={isLoading}
      />
    </Box>
  );
};
