import { cn } from "@/lib/utils";
import mermaidSilhouette from "@/assets/mermaid-silhouette.jpg";

interface MermaidRevealProps {
  revealedParts: number;
  totalParts: number;
  isComplete: boolean;
}

export function MermaidReveal({ revealedParts, totalParts, isComplete }: MermaidRevealProps) {
  const revealPercentage = (revealedParts / totalParts) * 100;

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Ocean background with bubbles */}
      <div className="absolute inset-0 ocean-container rounded-3xl">
        {/* Floating bubbles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              width: Math.random() * 20 + 10 + 'px',
              height: Math.random() * 20 + 10 + 'px',
              left: Math.random() * 80 + 10 + '%',
              top: Math.random() * 80 + 10 + '%',
              animationDelay: Math.random() * 4 + 's'
            }}
          />
        ))}
      </div>

      {/* Mermaid container */}
      <div className="absolute inset-4 rounded-2xl overflow-hidden">
        {/* Hidden mermaid (blurred background) */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
          style={{ backgroundImage: `url(${mermaidSilhouette})` }}
        />
        
        {/* Revealed mermaid parts */}
        <div 
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-all duration-1000 mermaid-reveal",
            isComplete && "animate-mermaid-dance"
          )}
          style={{ 
            backgroundImage: `url(${mermaidSilhouette})`,
            clipPath: `inset(${100 - revealPercentage}% 0 0 0)`
          }}
        />
        
        {/* Overlay for incomplete parts */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/20 transition-all duration-1000"
          style={{ 
            clipPath: `inset(0 0 ${revealPercentage}% 0)`
          }}
        />
      </div>

      {/* Progress indicator */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2">
          {Array.from({ length: totalParts }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                i < revealedParts 
                  ? "treasure-effect" 
                  : "bg-muted/50 border-2 border-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}