'use server';

import { getAgent } from '@/lib/rag.agent';
import { v4 as uuidv4 } from 'uuid';

export async function sendChatRequest(userQuestion: string): Promise<{ text: string; systemResponse: string }> {
  try {
    if (!userQuestion || typeof userQuestion !== 'string' || userQuestion.trim().length === 0) {
      throw new Error('La pregunta es requerida y debe ser un texto válido.');
    }

    const agent = await getAgent();
    // Use proper thread_id handling if needed, or simple invoke as per RAG agent setup
    // The current RAG agent implementation uses MemorySaver checkpointer
    const threadId = uuidv4();

    const response = await agent.invoke(
      {
        messages: [
          {
            role: 'user',
            content: userQuestion.trim(),
          },
        ],
      },
      {
        configurable: { thread_id: threadId },
      }
    );

    const lastMessage = response.messages?.[response.messages.length - 1];
    const systemResponse = lastMessage?.content ?? 'No response generated';
    
    // Ensure response is string
    const textResponse = typeof systemResponse === 'string' ? systemResponse : JSON.stringify(systemResponse);

    return {
      text: textResponse,
      systemResponse: textResponse,
    };
  } catch (error) {
    console.error('❌ [Server Action] Error in sendChatRequest:', error);
    return {
      text: 'Lo siento, ocurrió un error al procesar tu solicitud.',
      systemResponse: 'Error interno del servidor.',
    };
  }
}
