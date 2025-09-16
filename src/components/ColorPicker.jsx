import { useState } from "react";
import { Palette } from "lucide-react";

export const ColorPicker = ({ activeColor, onColorChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const presetColors = [
    "#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff",
    "#ffff00", "#ff00ff", "#00ffff", "#ffa500", "#800080",
    "#ffc0cb", "#a52a2a", "#808080", "#008000", "#000080",
    "#ffd700", "#dc143c", "#4b0082", "#ff6347", "#40e0d0"
  ];

  // Helper function to convert HSL to Hex
  const hslToHex = (hsl) => {
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return hsl;
    
    const [, h, s, l] = match.map(Number);
    const hDecimal = l / 100;
    const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const displayColor = activeColor.startsWith('hsl') ? hslToHex(activeColor) : activeColor;

  return (
    <div className="space-y-4">
      {/* Active Color Display */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg border-2 border-white/20 shadow-elegant cursor-pointer"
          style={{ backgroundColor: displayColor }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white transition-all"
        >
          <Palette className="h-4 w-4" />
          <span className="text-sm">Pick Color</span>
        </button>
      </div>

      {/* Color Picker */}
      {showPicker && (
        <div className="space-y-3 p-4 bg-white/5 rounded-xl border border-white/10">
          {/* Preset Colors */}
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onColorChange(color);
                  setShowPicker(false);
                }}
                className={`w-8 h-8 rounded-lg border-2 transition-all ${
                  displayColor === color
                    ? "border-white scale-110 shadow-glow"
                    : "border-white/20 hover:scale-105"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Custom Color Input */}
          <div className="space-y-2">
            <input
              type="color"
              value={displayColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-full h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={displayColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Enter hex color"
            />
          </div>
        </div>
      )}
    </div>
  );
};