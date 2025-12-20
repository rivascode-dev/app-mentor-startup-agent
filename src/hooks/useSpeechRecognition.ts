'use client';
import { useState, useEffect, useCallback } from 'react';

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult[];
  length: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((event: Event) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((event: Event) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

export const useSpeechRecognition = (onStateChange: ((isListening: boolean) => void) | null = null) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Verificar si el navegador soporta SpeechRecognition
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognitionAPI) {
        setError('Tu navegador no soporta el reconocimiento de voz.');
        return;
      }

      const recognitionInstance = new SpeechRecognitionAPI() as SpeechRecognition;

      // Configurar
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'es-ES'; // Idioma español

      // Eventos
      recognitionInstance.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setError(null);
      };

      recognitionInstance.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        setTranscript(result);
      };

      recognitionInstance.onerror = (event: any) => {
        setError(`Error en reconocimiento: ${event.error}`);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    // Limpiar al desmontar
    return () => {
      if (recognition) {
        try {
          recognition.abort();
        } catch (err) {
          console.error('Error al abortar reconocimiento:', err);
        }
      }
    };
  }, []);

  // Notificar cambios en el estado de grabación
  useEffect(() => {
    if (onStateChange) {
      onStateChange(isListening);
    }
  }, [isListening, onStateChange]);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (err) {
        console.error('Error iniciando reconocimiento:', err);
        setError('Error al iniciar el reconocimiento de voz.');
      }
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      try {
        recognition.stop();
      } catch (err) {
        console.error('Error deteniendo reconocimiento:', err);
      }
    }
  }, [recognition, isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript,
    hasRecognitionSupport: !!recognition,
  };
};
