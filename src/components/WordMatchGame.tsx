import { useWordMatchGame } from "@/hooks/useWordMatchGame";
import { MermaidReveal } from "./MermaidReveal";
import { WordChoice } from "./WordChoice";
import { GameStats } from "./GameStats";
import { VictoryScreen } from "./VictoryScreen";
import { TTSButton } from "./TTSButton";
import { OceanCanvas } from "./OceanCanvas";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export function WordMatchGame() {
  const {
    gameState,
    feedback,
    getCurrentWord,
    handleAnswer,
    resetGame,
    getAccuracy,
    getFormattedTime,
    totalWords,
    totalParts,
    speakCurrentWord
  } = useWordMatchGame();

  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const handleChoiceSelect = (index: number) => {
    if (gameState.isAnswering) return;
    
    setSelectedChoice(index);
    handleAnswer(index);
    
    // Reset selection after feedback
    setTimeout(() => setSelectedChoice(null), 1500);
  };

  if (gameState.isComplete) {
    return (
      <VictoryScreen
        score={gameState.score}
        accuracy={getAccuracy()}
        timeElapsed={getFormattedTime()}
        onRestart={resetGame}
      />
    );
  }

  const currentWord = getCurrentWord();

  return (
    <div className="min-h-screen ocean-container p-4 flex flex-col">
      {/* Game Stats */}
      <div className="mb-6">
        <GameStats
          score={gameState.score}
          accuracy={getAccuracy()}
          timeElapsed={getFormattedTime()}
          currentWord={gameState.currentWordIndex + 1}
          totalWords={totalWords}
        />
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 items-center justify-center max-w-6xl mx-auto">
        
        {/* Mermaid Reveal Section */}
        <div className="flex-1 flex flex-col items-center space-y-6">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/30">
            <h2 className="text-2xl font-bold text-center mb-4 text-primary">
              Help Reveal the Mermaid! 🧜‍♀️
            </h2>
            <p className="text-center text-muted-foreground mb-4">
              The word is spoken automatically. Choose the correct spelling!
            </p>
            <MermaidReveal
              revealedParts={gameState.revealedParts}
              totalParts={totalParts}
              isComplete={gameState.isComplete}
            />
          </Card>
        </div>

        {/* Game Controls Section */}
        <div className="flex-1 flex flex-col items-center space-y-8 max-w-md">
          
          {/* Current Word Display & TTS */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/30 w-full">
            <div className="text-center space-y-4">
              <h3 className="text-lg text-muted-foreground">
                Find the word:
              </h3>
              <div className="flex items-center justify-center gap-4">
                <div className="text-3xl font-bold text-primary">
                  "{currentWord.target}"
                </div>
                <TTSButton 
                  word={currentWord.target} 
                  disabled={gameState.isAnswering}
                  onSpeak={speakCurrentWord}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Word spoken automatically • Click speaker to repeat
              </p>
            </div>
          </Card>

          {/* Word Choices */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {currentWord.choices.map((choice, index) => (
              <WordChoice
                key={index}
                word={choice}
                index={index}
                isSelected={selectedChoice === index}
                feedback={selectedChoice === index ? feedback : null}
                onSelect={handleChoiceSelect}
                disabled={gameState.isAnswering}
              />
            ))}
          </div>

          {/* Feedback Message */}
          {feedback && (
            <Card className={`p-4 text-center transition-all duration-300 ${
              feedback === 'correct' 
                ? 'treasure-effect' 
                : 'bg-destructive/20 border-destructive'
            }`}>
              <div className={`text-lg font-bold ${
                feedback === 'correct' ? 'text-primary' : 'text-destructive'
              }`}>
                {feedback === 'correct' 
                  ? '🌟 Excellent! Part revealed!' 
                  : '💫 Try again! You can do it!'
                }
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Enhanced Ocean Atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Ocean creatures canvas */}
        <OceanCanvas />
        
        {/* Additional coral decorations */}
        <div className="coral-reef opacity-30" />
        <div className="ocean-floor opacity-40" />
      </div>
    </div>
  );
}