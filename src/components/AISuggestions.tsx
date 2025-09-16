import { Sparkles, Lightbulb, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AISuggestionsProps {
  onSuggestionApply: (suggestion: string) => void;
}

export const AISuggestions = ({ onSuggestionApply }: AISuggestionsProps) => {
  const suggestions = [
    {
      id: "enhance-colors",
      title: "Enhance Colors",
      description: "Add vibrant gradients to your shapes",
      icon: Sparkles,
      action: "gradient-enhancement"
    },
    {
      id: "add-shadows",
      title: "Add Depth",
      description: "Apply shadows for 3D effect",
      icon: Lightbulb,
      action: "shadow-effects"
    },
    {
      id: "suggest-shapes",
      title: "Smart Shapes",
      description: "AI suggests complementary shapes",
      icon: Wand2,
      action: "shape-suggestions"
    }
  ];

  const handleApplySuggestion = (suggestion: typeof suggestions[0]) => {
    toast(`🎨 Applying ${suggestion.title}...`);
    onSuggestionApply(suggestion.action);
    
    // Simulate AI processing
    setTimeout(() => {
      toast(`✨ ${suggestion.title} applied successfully!`);
    }, 1500);
  };

  return (
    <div className="tool-panel p-4">
      <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        AI Suggestions
      </h3>
      
      <div className="space-y-3">
        <div className="text-xs text-muted-foreground mb-4">
          AI is analyzing your artwork and suggesting enhancements...
        </div>
        
        {suggestions.map((suggestion) => {
          const Icon = suggestion.icon;
          return (
            <div key={suggestion.id} className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground">
                    {suggestion.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {suggestion.description}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleApplySuggestion(suggestion)}
                className="w-full text-xs border-primary/30 hover:bg-primary/10"
              >
                Apply
              </Button>
            </div>
          );
        })}
        
        <div className="mt-4 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
          <div className="text-xs text-secondary font-medium">
            💡 Pro Tip
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Keep drawing! AI suggestions improve as you add more elements.
          </div>
        </div>
      </div>
    </div>
  );
};