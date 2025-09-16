import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen ocean-container flex items-center justify-center p-4">
      {/* Ocean atmosphere elements */}
      <div className="coral-reef opacity-30" />
      <div className="ocean-floor opacity-40" />
      
      <Card className="text-center p-8 bg-card/80 backdrop-blur-sm border-primary/30">
        <h1 className="mb-4 text-4xl font-bold text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! This ocean area is unexplored</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 treasure-effect rounded-lg font-bold hover:scale-105 transition-transform"
        >
          Return to Ocean Adventure
        </a>
      </Card>

      {/* Enhanced ocean bubbles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const bubbleType = i % 3 === 0 ? 'bubble-large' : i % 2 === 0 ? 'bubble-medium' : 'bubble-small';
        return (
          <div
            key={i}
            className={`bubble ${bubbleType} animate-realistic-float`}
            style={{
              left: Math.random() * 100 + '%',
              bottom: Math.random() * 25 - 10 + '%',
              animationDelay: Math.random() * 6 + 's'
            }}
          />
        );
      })}
    </div>
  );
};

export default NotFound;
