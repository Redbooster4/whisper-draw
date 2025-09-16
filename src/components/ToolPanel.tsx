import { MousePointer, Pencil, Square, Circle, Palette, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolPanelProps {
  activeTool: "select" | "draw" | "rectangle" | "circle";
  onToolClick: (tool: "select" | "draw" | "rectangle" | "circle") => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

export const ToolPanel = ({ activeTool, onToolClick, brushSize, onBrushSizeChange }: ToolPanelProps) => {
  const tools = [
    { id: "select" as const, icon: MousePointer, label: "Select" },
    { id: "draw" as const, icon: Pencil, label: "Draw" },
    { id: "rectangle" as const, icon: Square, label: "Rectangle" },
    { id: "circle" as const, icon: Circle, label: "Circle" },
  ];

  return (
    <div className="tool-panel p-4 space-y-4">
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Drawing Tools
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onToolClick(tool.id)}
                className={cn(
                  "tool-button flex flex-col items-center gap-1 text-xs",
                  activeTool === tool.id && "active"
                )}
                title={tool.label}
              >
                <Icon className="w-5 h-5" />
                <span className="truncate">{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeTool === "draw" && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            Brush Size
          </h3>
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => onBrushSizeChange(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="text-xs text-muted-foreground text-center">
              {brushSize}px
            </div>
          </div>
        </div>
      )}
    </div>
  );
};