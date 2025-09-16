import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

interface TTSButtonProps {
  word: string;
  disabled?: boolean;
}

export function TTSButton({ word, disabled }: TTSButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakWord = () => {
    if ('speechSynthesis' in window && !isSpeaking && !disabled) {
      setIsSpeaking(true);
      
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Button
      onClick={speakWord}
      disabled={disabled || isSpeaking}
      className="coral-decoration rounded-full w-16 h-16 hover:scale-110 transition-transform"
      variant="secondary"
    >
      {isSpeaking ? (
        <VolumeX className="h-8 w-8" />
      ) : (
        <Volume2 className="h-8 w-8" />
      )}
    </Button>
  );
}