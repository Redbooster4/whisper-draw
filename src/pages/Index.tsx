import { useState } from "react";
import { DrawingCanvas } from "@/components/DrawingCanvas";
import { ToolPanel } from "@/components/ToolPanel";
import { ColorPicker } from "@/components/ColorPicker";
import { AISuggestions } from "@/components/AISuggestions";
import { Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "rectangle" | "circle">("draw");
  const [activeColor, setActiveColor] = useState("hsl(262 83% 58%)");
  const [brushSize, setBrushSize] = useState(5);

  const handleSuggestionApply = (suggestion: string) => {
    // Placeholder for AI suggestion implementation
    console.log("Applying AI suggestion:", suggestion);
  };

  const handleCollaborate = () => {
    toast("🚀 Collaboration features coming soon! Multiple users will be able to draw together in real-time.");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                DrawTogether AI
              </h1>
              <p className="text-muted-foreground mt-2">
                Collaborative drawing with intelligent suggestions
              </p>
            </div>
            <Button 
              onClick={handleCollaborate}
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-lg"
            >
              <Users className="w-4 h-4 mr-2" />
              Collaborate
            </Button>
          </div>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
          {/* Left Sidebar - Tools */}
          <div className="col-span-2 flex flex-col gap-4 h-full">
            <ToolPanel
              activeTool={activeTool}
              onToolClick={setActiveTool}
              brushSize={brushSize}
              onBrushSizeChange={setBrushSize}
            />
            <ColorPicker
              activeColor={activeColor}
              onColorChange={setActiveColor}
            />
          </div>

          {/* Main Canvas */}
          <div className="col-span-8 flex items-center justify-center h-full">
            <div className="w-full h-full flex items-center justify-center">
              <DrawingCanvas
                activeTool={activeTool}
                activeColor={activeColor}
                brushSize={brushSize}
              />
            </div>
          </div>

          {/* Right Sidebar - AI Suggestions */}
          <div className="col-span-2 h-full">
            <AISuggestions onSuggestionApply={handleSuggestionApply} />
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-6">
          <div className="tool-panel p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <span className="text-muted-foreground">
                  Tool: <span className="text-primary font-medium capitalize">{activeTool}</span>
                </span>
                <div className="w-px h-4 bg-border" />
                <span className="text-muted-foreground flex items-center gap-2">
                  Color: 
                  <span 
                    className="inline-block w-5 h-5 rounded-full border-2 border-border" 
                    style={{ backgroundColor: activeColor }} 
                  />
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>AI Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
