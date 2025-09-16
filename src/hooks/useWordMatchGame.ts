import { useState, useEffect, useCallback } from 'react';

export interface WordPair {
  id: number;
  target: string;
  choices: string[];
  correctIndex: number;
}

export interface GameState {
  currentWordIndex: number;
  score: number;
  attempts: number;
  correctAnswers: number;
  revealedParts: number;
  isComplete: boolean;
  startTime: number;
  timeElapsed: number;
  isAnswering: boolean;
}

// Sample word pairs for the game
const WORD_PAIRS: WordPair[] = [
  {
    id: 1,
    target: "ocean",
    choices: ["ocean", "open", "often", "orange"],
    correctIndex: 0
  },
  {
    id: 2,
    target: "fish",
    choices: ["wish", "dish", "fish", "finish"],
    correctIndex: 2
  },
  {
    id: 3,
    target: "coral",
    choices: ["coral", "color", "cool", "call"],
    correctIndex: 0
  },
  {
    id: 4,
    target: "wave",
    choices: ["have", "wave", "save", "gave"],
    correctIndex: 1
  },
  {
    id: 5,
    target: "deep",
    choices: ["keep", "sleep", "deep", "help"],
    correctIndex: 2
  },
  {
    id: 6,
    target: "blue",
    choices: ["blow", "blue", "glue", "clue"],
    correctIndex: 1
  },
  {
    id: 7,
    target: "swim",
    choices: ["swim", "swing", "slim", "skip"],
    correctIndex: 0
  },
  {
    id: 8,
    target: "shell",
    choices: ["smell", "spell", "shell", "shelf"],
    correctIndex: 2
  }
];

const TOTAL_MERMAID_PARTS = 8;

export function useWordMatchGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentWordIndex: 0,
    score: 0,
    attempts: 0,
    correctAnswers: 0,
    revealedParts: 0,
    isComplete: false,
    startTime: Date.now(),
    timeElapsed: 0,
    isAnswering: false
  });

  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Update timer
  useEffect(() => {
    if (!gameState.isComplete) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeElapsed: Date.now() - prev.startTime
        }));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [gameState.isComplete]);

  const getCurrentWord = () => WORD_PAIRS[gameState.currentWordIndex];

  const handleAnswer = useCallback((choiceIndex: number) => {
    if (gameState.isAnswering || gameState.isComplete) return;

    setGameState(prev => ({ ...prev, isAnswering: true }));
    
    const currentWord = getCurrentWord();
    const isCorrect = choiceIndex === currentWord.correctIndex;
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setGameState(prev => {
        const newState = {
          ...prev,
          attempts: prev.attempts + 1,
          isAnswering: false
        };

        if (isCorrect) {
          newState.score += 10;
          newState.correctAnswers += 1;
          newState.revealedParts += 1;
          
          // Move to next word or complete game
          if (prev.currentWordIndex < WORD_PAIRS.length - 1) {
            newState.currentWordIndex += 1;
          } else {
            newState.isComplete = true;
          }
        }

        return newState;
      });

      setFeedback(null);
    }, 1500);
  }, [gameState.isAnswering, gameState.isComplete]);

  const resetGame = useCallback(() => {
    setGameState({
      currentWordIndex: 0,
      score: 0,
      attempts: 0,
      correctAnswers: 0,
      revealedParts: 0,
      isComplete: false,
      startTime: Date.now(),
      timeElapsed: 0,
      isAnswering: false
    });
    setFeedback(null);
  }, []);

  const getAccuracy = () => {
    if (gameState.attempts === 0) return 100;
    return Math.round((gameState.correctAnswers / gameState.attempts) * 100);
  };

  const getFormattedTime = () => {
    const seconds = Math.floor(gameState.timeElapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return {
    gameState,
    feedback,
    getCurrentWord,
    handleAnswer,
    resetGame,
    getAccuracy,
    getFormattedTime,
    totalWords: WORD_PAIRS.length,
    totalParts: TOTAL_MERMAID_PARTS
  };
}