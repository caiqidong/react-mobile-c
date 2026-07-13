import { useEffect, useState } from 'react';

const DEFAULT_KEYBOARD_THRESHOLD = 150;

export interface UseKeyboardOptions {
  threshold?: number;
}

export interface KeyboardState {
  isKeyboardVisible: boolean;
  keyboardHeight: number;
}

export function useKeyboard({
  threshold = DEFAULT_KEYBOARD_THRESHOLD,
}: UseKeyboardOptions = {}): KeyboardState {
  const [state, setState] = useState<KeyboardState>({
    isKeyboardVisible: false,
    keyboardHeight: 0,
  });

  useEffect(() => {
    const viewport = window.visualViewport;

    if (!viewport) {
      return;
    }

    const updateKeyboard = () => {
      const heightDifference = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop,
      );
      const isKeyboardVisible = heightDifference > threshold;

      setState({
        isKeyboardVisible,
        keyboardHeight: isKeyboardVisible ? heightDifference : 0,
      });
    };

    updateKeyboard();
    viewport.addEventListener('resize', updateKeyboard);
    viewport.addEventListener('scroll', updateKeyboard);

    return () => {
      viewport.removeEventListener('resize', updateKeyboard);
      viewport.removeEventListener('scroll', updateKeyboard);
    };
  }, [threshold]);

  return state;
}
