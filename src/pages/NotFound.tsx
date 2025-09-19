import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { OceanCanvas } from "@/components/OceanCanvas";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen ocean-container flex items-center justify-center p-4">
      {/* Ocean creatures canvas */}
      <OceanCanvas />
      
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
    </div>
  );
};

export default NotFound;
