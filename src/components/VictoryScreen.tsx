import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OceanCanvas } from "./OceanCanvas";
import { Trophy, Star, RotateCcw } from "lucide-react";
import mermaidSilhouette from "@/assets/mermaid-silhouette.jpg";

interface VictoryScreenProps {
  score: number;
  accuracy: number;
  timeElapsed: string;
  onRestart: () => void;
}

export function VictoryScreen({ score, accuracy, timeElapsed, onRestart }: VictoryScreenProps) {
  return (
    <div className="flex flex-col items-center space-y-8 text-center">
      {/* Victory Message */}
      <div className="space-y-4">
        <div className="flex justify-center">
          <Trophy className="h-16 w-16 treasure-effect" />
        </div>
        <h1 className="text-4xl font-bold text-primary">
          Mermaid Rescued! 🧜‍♀️
        </h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Congratulations! You've helped reveal the beautiful mermaid by matching all the ocean words!
        </p>
      </div>

      {/* Dancing Mermaid */}
      <div className="relative">
        <div 
          className="w-48 h-48 bg-cover bg-center rounded-3xl mermaid-reveal animate-mermaid-dance"
          style={{ backgroundImage: `url(${mermaidSilhouette})` }}
        />
        {/* Sparkle effects */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Star
            key={i}
            className="absolute treasure-effect animate-pulse"
            style={{
              width: '16px',
              height: '16px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>

      {/* Final Stats */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/30 max-w-md">
        <h3 className="text-xl font-bold mb-4 text-primary">Final Results</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold treasure-effect bg-clip-text text-transparent">
              {score}
            </div>
            <div className="text-sm text-muted-foreground">Points</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">
              {accuracy}%
            </div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {timeElapsed}
            </div>
            <div className="text-sm text-muted-foreground">Time</div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button 
          onClick={onRestart}
          className="treasure-effect px-8 py-3 text-lg hover:scale-105 transition-transform"
          size="lg"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Play Again
        </Button>
      </div>

      {/* Enhanced celebration atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Ocean creatures canvas */}
        <OceanCanvas />
        
        {/* Ocean decorations */}
        <div className="coral-reef opacity-40" />
        <div className="ocean-floor opacity-50" />
      </div>
    </div>
  );
}