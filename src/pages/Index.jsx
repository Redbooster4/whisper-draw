import { useState } from "react";
import { DrawingCanvas } from "@/components/DrawingCanvas";
import { ToolPanel } from "@/components/ToolPanel";
import { ColorPicker } from "@/components/ColorPicker";
import { AISuggestions } from "@/components/AISuggestions";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [activeTool, setActiveTool] = useState("draw");
  const [activeColor, setActiveColor] = useState("#3b82f6");
  const [brushSize, setBrushSize] = useState(5);

  const handleToolClick = (tool) => {
    setActiveTool(tool);
  };

  const handleSuggestionApply = (suggestion) => {
    console.log("Applying AI suggestion:", suggestion);
    // This will be enhanced when we add real AI integration
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/5 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-accent"></div>
              <h1 className="text-2xl font-bold text-white">DrawTogether AI</h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/10 text-white">
                Solo Mode
              </Badge>
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-[280px_1fr_320px] gap-6 p-6 h-[calc(100vh-88px)]">
        {/* Left Sidebar - Tools */}
        <div className="flex flex-col gap-4 h-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-elegant">
            <h2 className="text-lg font-semibold text-white mb-4">Drawing Tools</h2>
            <ToolPanel
              activeTool={activeTool}
              onToolClick={handleToolClick}
              brushSize={brushSize}
              onBrushSizeChange={setBrushSize}
            />
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-elegant">
            <h2 className="text-lg font-semibold text-white mb-4">Colors</h2>
            <ColorPicker
              activeColor={activeColor}
              onColorChange={setActiveColor}
            />
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-elegant flex items-center justify-center">
          <DrawingCanvas
            activeTool={activeTool}
            activeColor={activeColor}
            brushSize={brushSize}
          />
        </div>

        {/* Right Sidebar - AI Suggestions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-elegant h-full">
          <AISuggestions onSuggestionApply={handleSuggestionApply} />
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-t border-white/20 bg-white/5 backdrop-blur-sm">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between text-sm text-white/70">
            <div className="flex items-center gap-4">
              <span>Tool: {activeTool}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Brush: {brushSize}px</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Color: {activeColor}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <span>Canvas Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;