
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
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

  return (
    <form 
      onSubmit={handleSubmit} 
      className="search-bar animate-fade-in"
    >
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your image..."
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
  );
};

export default ImagePrompt;
