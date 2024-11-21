import { useState, useEffect, useCallback } from 'react';

interface UseAudioReturn {
  playBeat: () => void;
  isLoaded: boolean;
  error: string | null;
}

export const useAudio = (): UseAudioReturn => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize AudioContext only on user interaction or when needed
    if (typeof window !== 'undefined' && !audioContext) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(ctx);
        setIsLoaded(true);
      } catch (err) {
        setError('Could not initialize audio context');
        console.error('Audio Context Error:', err);
      }
    }

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const playBeat = useCallback(() => {
    if (!audioContext) return;

    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      // Configure oscillator
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note

      // Configure gain (volume)
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      );

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Play sound
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (err) {
      setError('Error playing beat');
      console.error('Play Beat Error:', err);
    }
  }, [audioContext]);

  return {
    playBeat,
    isLoaded,
    error
  };
};

// For browsers that don't support AudioContext
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}