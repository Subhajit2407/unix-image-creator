
import { useState } from "react";
import { Sparkles, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePromptProps {
  onSubmit: (prompt: string) => void;
  isGenerating: boolean;
}

const ImagePrompt = ({ onSubmit, isGenerating }: ImagePromptProps) => {
  const [prompt, setPrompt] = useState("");

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
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your image in detail..."
          disabled={isGenerating}
          className="pr-[140px]"
        />
        <Button 
          type="submit" 
          className="unix-button absolute right-2 top-1/2 transform -translate-y-1/2"
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
