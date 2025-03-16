
import { useState, useEffect } from "react";
import { Sparkles, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ImagePromptProps {
  onSubmit: (prompt: string) => void;
  isGenerating: boolean;
  initialPrompt?: string;
}

const ImagePrompt = ({ onSubmit, isGenerating, initialPrompt }: ImagePromptProps) => {
  const [prompt, setPrompt] = useState("");
  
  // Update prompt when initialPrompt changes
  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onSubmit(prompt.trim());
    }
  };

  const samplePrompts = [
    "A stunning landscape with mountains and a lake at sunset",
    "An astronaut riding a horse on Mars, digital art",
    "A magical forest with glowing mushrooms and fairy lights",
    "A futuristic cityscape with flying cars and neon lights"
  ];

  const handleSamplePrompt = (sample: string) => {
    setPrompt(sample);
  };

  return (
    <div className="animate-fade-in">
      <form 
        onSubmit={handleSubmit} 
        className="search-bar mb-6"
      >
        <div className="relative w-full bg-unix-subtle rounded-2xl shadow-inner-soft transition-all duration-300 focus-within:shadow-soft focus-within:bg-white focus-within:ring-2 focus-within:ring-unix-accent/30">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image in detail..."
            disabled={isGenerating}
            className="w-full py-4 px-6 bg-transparent border-0 resize-none min-h-[120px] placeholder:text-unix-muted/70 focus-visible:ring-0 focus-visible:outline-none"
          />
        </div>
        
        <div className="mt-3 flex justify-end">
          <Button 
            type="submit" 
            className="unix-button"
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 justify-center mt-4">
        <div className="text-sm text-unix-muted flex items-center mr-2">
          <Wand2 className="h-3 w-3 mr-1" />
          Try:
        </div>
        {samplePrompts.map((sample, index) => (
          <button
            key={index}
            onClick={() => handleSamplePrompt(sample)}
            className="text-xs px-3 py-1.5 bg-unix-subtle hover:bg-unix-accent/10 rounded-full text-unix-muted transition-colors"
          >
            {sample.length > 30 ? `${sample.substring(0, 30)}...` : sample}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImagePrompt;
