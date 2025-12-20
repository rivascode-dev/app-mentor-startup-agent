'use client';
import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'bienvenida',
    role: 'agent',
    content: '¡Hola! Soy tu Mentor Estratégico y Legal. ¿En qué puedo ayudarte hoy?',
    timestamp: new Date().toISOString(),
  },
];

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  const addUserQuestion = useCallback((content: string) => {
    const newQuestion: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newQuestion]);
  }, []);

  const addChatResponse = useCallback((content: string) => {
    const newResponse: Message = {
      id: crypto.randomUUID(),
      role: 'agent',
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newResponse]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
  }, []);

  return {
    messages,
    addUserQuestion,
    addChatResponse,
    clearMessages,
  };
};
