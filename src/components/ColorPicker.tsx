import { useState } from "react";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  activeColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker = ({ activeColor, onColorChange }: ColorPickerProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const presetColors = [
    "#262 83% 58%", // Primary purple
    "#192 87% 55%", // Secondary teal
    "#25 95% 53%",  // Accent orange
    "#0 84% 60%",   // Red
    "#120 100% 30%", // Green
    "#220 100% 50%", // Blue
    "#60 100% 50%",  // Yellow
    "#300 100% 50%", // Magenta
    "#0 0% 0%",      // Black
    "#0 0% 50%",     // Gray
    "#0 0% 100%",    // White
  ];

  const hslToHex = (hsl: string) => {
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v.replace('%', '')));
    const a = s * Math.min(l, 100 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color / 100).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  return (
    <div className="tool-panel p-4">
      <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
        <Palette className="w-4 h-4" />
        Colors
      </h3>
      
      <div className="space-y-3">
        <div 
          className="w-12 h-12 rounded-lg border-2 border-tool-border cursor-pointer flex items-center justify-center"
          style={{ backgroundColor: activeColor }}
          onClick={() => setShowPicker(!showPicker)}
        >
          {activeColor === "transparent" && (
            <div className="w-full h-full bg-gradient-to-br from-red-500 to-transparent rounded-lg" />
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {presetColors.map((color, index) => {
            const hexColor = color.includes('%') ? hslToHex(color) : color;
            return (
              <button
                key={index}
                className="w-8 h-8 rounded-md border border-tool-border hover:scale-110 transition-transform"
                style={{ backgroundColor: `hsl(${color})` }}
                onClick={() => onColorChange(`hsl(${color})`)}
                title={`Color ${index + 1}`}
              />
            );
          })}
        </div>

        {showPicker && (
          <div className="space-y-2">
            <input
              type="color"
              value={activeColor.startsWith('#') ? activeColor : '#000000'}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-full h-8 rounded-md border border-tool-border"
            />
            <input
              type="text"
              value={activeColor}
              onChange={(e) => onColorChange(e.target.value)}
              placeholder="Enter color (hex, hsl, rgb)"
              className="w-full px-2 py-1 text-xs bg-input border border-tool-border rounded text-foreground"
            />
          </div>
        )}
      </div>
    </div>
  );
};