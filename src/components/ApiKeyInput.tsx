
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyInput = ({ onSubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <Card className="p-6 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Enter Runware API Key</h3>
            <p className="text-sm text-unix-muted">
              To use Unix, you need a Runware API key. Visit{" "}
              <a 
                href="https://runware.ai/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-unix-accent hover:underline"
              >
                runware.ai
              </a>{" "}
              to get your key.
            </p>
          </div>
          
          <div className="relative">
            <Input
              type={isVisible ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10"
              placeholder="Enter your API key"
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-unix-muted hover:text-foreground"
            >
              {isVisible ? "Hide" : "Show"}
            </button>
          </div>
          
          <Button 
            type="submit" 
            disabled={!apiKey.trim()} 
            className="w-full unix-button"
          >
            Confirm
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ApiKeyInput;
