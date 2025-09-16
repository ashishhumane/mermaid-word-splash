import { Card } from "@/components/ui/card";

interface GameStatsProps {
  score: number;
  accuracy: number;
  timeElapsed: string;
  currentWord: number;
  totalWords: number;
}

export function GameStats({ 
  score, 
  accuracy, 
  timeElapsed, 
  currentWord, 
  totalWords 
}: GameStatsProps) {
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      <Card className="px-4 py-2 bg-card/80 backdrop-blur-sm border-primary/30">
        <div className="text-center">
          <div className="text-2xl font-bold treasure-effect bg-clip-text text-transparent">
            {score}
          </div>
          <div className="text-sm text-muted-foreground">Score</div>
        </div>
      </Card>
      
      <Card className="px-4 py-2 bg-card/80 backdrop-blur-sm border-primary/30">
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">
            {accuracy}%
          </div>
          <div className="text-sm text-muted-foreground">Accuracy</div>
        </div>
      </Card>
      
      <Card className="px-4 py-2 bg-card/80 backdrop-blur-sm border-primary/30">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {timeElapsed}
          </div>
          <div className="text-sm text-muted-foreground">Time</div>
        </div>
      </Card>
      
      <Card className="px-4 py-2 bg-card/80 backdrop-blur-sm border-primary/30">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {currentWord}/{totalWords}
          </div>
          <div className="text-sm text-muted-foreground">Words</div>
        </div>
      </Card>
    </div>
  );
}