import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

interface TTSButtonProps {
  word: string;
  disabled?: boolean;
  onSpeak?: () => void;
}

export function TTSButton({ word, disabled, onSpeak }: TTSButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakWord = () => {
    if ('speechSynthesis' in window && !isSpeaking && !disabled) {
      setIsSpeaking(true);
      
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.7;
      utterance.pitch = 1.2;
      utterance.volume = 0.9;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
      onSpeak?.();
    }
  };

  return (
    <Button
      onClick={speakWord}
      disabled={disabled || isSpeaking}
      className="coral-decoration rounded-full w-12 h-12 hover:scale-110 transition-transform"
      variant="secondary"
      title="Hear the word again"
    >
      {isSpeaking ? (
        <VolumeX className="h-5 w-5" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </Button>
  );
}