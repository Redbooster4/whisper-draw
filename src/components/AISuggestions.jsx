import { Button } from "@/components/ui/button";
import { Lightbulb, Palette, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";

export const AISuggestions = ({ onSuggestionApply }) => {
  const suggestions = [
    {
      id: 1,
      title: "Add Color Gradient",
      description: "Apply a beautiful gradient to enhance your artwork",
      icon: Palette,
      action: "gradient_enhancement"
    },
    {
      id: 2,
      title: "Smart Shadows",
      description: "Add realistic shadows to give depth to your drawing",
      icon: Sparkles,
      action: "shadow_enhancement"
    },
    {
      id: 3,
      title: "Shape Suggestions",
      description: "Get suggestions for completing partial shapes",
      icon: Lightbulb,
      action: "shape_completion"
    },
    {
      id: 4,
      title: "Style Transfer",
      description: "Apply artistic styles like watercolor or sketch",
      icon: Zap,
      action: "style_transfer"
    }
  ];

  const handleApplySuggestion = (suggestion) => {
    toast(`Applying ${suggestion.title}...`, {
      description: "AI is processing your artwork"
    });
    onSuggestionApply(suggestion.action);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div>
        <h2 className="text-lg font-semibold text-white mb-2">AI Suggestions</h2>
        <p className="text-sm text-white/70 mb-4">
          Get smart suggestions to enhance your artwork
        </p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {suggestions.map((suggestion) => {
          const Icon = suggestion.icon;
          return (
            <div
              key={suggestion.id}
              className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-gradient-accent rounded-lg">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white text-sm">{suggestion.title}</h3>
                  <p className="text-xs text-white/70 mt-1">{suggestion.description}</p>
                </div>
              </div>
              <Button
                onClick={() => handleApplySuggestion(suggestion)}
                size="sm"
                className="w-full bg-gradient-accent hover:opacity-90 text-white border-0 transition-all"
              >
                Apply
              </Button>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium text-white">Pro Tip</span>
        </div>
        <p className="text-xs text-white/70">
          AI suggestions get better as you add more elements to your canvas. Keep drawing!
        </p>
      </div>
    </div>
  );
};