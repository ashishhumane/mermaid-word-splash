import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WordChoiceProps {
  word: string;
  index: number;
  isSelected: boolean;
  feedback: 'correct' | 'incorrect' | null;
  onSelect: (index: number) => void;
  disabled: boolean;
}

export function WordChoice({ 
  word, 
  index, 
  isSelected, 
  feedback, 
  onSelect, 
  disabled 
}: WordChoiceProps) {
  const getFeedbackClass = () => {
    if (!isSelected || !feedback) return '';
    return feedback === 'correct' ? 'correct' : 'incorrect';
  };

  return (
    <Button
      onClick={() => onSelect(index)}
      disabled={disabled}
      className={cn(
        "word-choice h-16 text-xl font-bold rounded-2xl",
        getFeedbackClass()
      )}
      variant="secondary"
    >
      {word}
    </Button>
  );
}