import { MousePointer2, Paintbrush, Square, Circle } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export const ToolPanel = ({ activeTool, onToolClick, brushSize, onBrushSizeChange }) => {
  const tools = [
    { id: "select", name: "Select", icon: MousePointer2 },
    { id: "draw", name: "Draw", icon: Paintbrush },
    { id: "rectangle", name: "Rectangle", icon: Square },
    { id: "circle", name: "Circle", icon: Circle },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => onToolClick(tool.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                activeTool === tool.id
                  ? "bg-white/20 border-white/40 text-white shadow-glow"
                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tool.name}</span>
            </button>
          );
        })}
      </div>

      {activeTool === "draw" && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90">
            Brush Size: {brushSize}px
          </label>
          <Slider
            value={[brushSize]}
            onValueChange={([value]) => onBrushSizeChange(value)}
            min={1}
            max={50}
            step={1}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};