
import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";
import ApiKeyInput from "@/components/ApiKeyInput";
import ImagePrompt from "@/components/ImagePrompt";
import ImageDisplay from "@/components/ImageDisplay";
import ImageHistory from "@/components/ImageHistory";
import { getRunwareService, type GeneratedImage } from "@/services/runware.service";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("unix_api_key") || "";
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  // Save API key to local storage
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("unix_api_key", apiKey);
    }
  }, [apiKey]);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    toast.success("API key saved successfully");
  };

  const handlePromptSubmit = async (prompt: string) => {
    if (!apiKey) {
      toast.error("Please enter a valid API key");
      return;
    }

    setIsGenerating(true);
    const runwareService = getRunwareService(apiKey);
    
    try {
      const generatedImage = await runwareService.generateImage({
        positivePrompt: prompt,
        model: "runware:100@1",
      });
      
      setGeneratedImages(prev => [generatedImage, ...prev]);
      setSelectedImage(generatedImage);
      toast.success("Image generated successfully");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12 md:py-20">
      <Toaster position="top-center" />
      
      <header className="max-w-5xl mx-auto text-center mb-12 animate-fade-in">
        <div className="inline-block px-4 py-1 mb-4 rounded-full bg-unix-subtle text-unix-muted text-sm font-medium">
          Image Generation
        </div>
        <h1 className="text-4xl font-semibold mb-3">Unix</h1>
        <p className="text-unix-muted max-w-2xl mx-auto">
          Generate beautiful images with a simple prompt. Powered by advanced AI technology.
        </p>
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        {!apiKey ? (
          <ApiKeyInput onSubmit={handleApiKeySubmit} />
        ) : (
          <>
            <ImagePrompt 
              onSubmit={handlePromptSubmit} 
              isGenerating={isGenerating}
            />
            
            <div className="mt-12">
              {selectedImage ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ImageDisplay image={selectedImage} />
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium">Image Details</h2>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-unix-muted">Prompt</span>
                        <p className="mt-1">{selectedImage.positivePrompt}</p>
                      </div>
                      <div>
                        <span className="text-sm text-unix-muted">Seed</span>
                        <p className="mt-1">{selectedImage.seed}</p>
                      </div>
                      <div>
                        <span className="text-sm text-unix-muted">Model</span>
                        <p className="mt-1">runware:100@1</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={() => setApiKey("")}
                        className="text-sm text-unix-muted hover:text-unix-accent transition-colors"
                      >
                        Change API Key
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-unix-subtle rounded-2xl p-10 text-center animate-fade-in">
                  <h3 className="text-xl font-medium mb-2">No images generated yet</h3>
                  <p className="text-unix-muted mb-4">
                    Enter a prompt above to create your first image
                  </p>
                </div>
              )}
            </div>

            <ImageHistory 
              images={generatedImages} 
              onSelect={setSelectedImage}
              selectedImage={selectedImage}
            />
          </>
        )}
      </main>

      <footer className="max-w-5xl mx-auto mt-20 pt-6 border-t border-unix-subtle text-center text-sm text-unix-muted">
        <p>© {new Date().getFullYear()} Unix. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
