
import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, Library, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import ApiKeyInput from "@/components/ApiKeyInput";
import ImagePrompt from "@/components/ImagePrompt";
import ImageDisplay from "@/components/ImageDisplay";
import ImageHistory from "@/components/ImageHistory";
import { getRunwareService, type GeneratedImage } from "@/services/runware.service";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("mewtic_api_key") || "";
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  // Save API key to local storage
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("mewtic_api_key", apiKey);
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

  const handleSaveImage = () => {
    if (!selectedImage) return;
    
    try {
      // Get existing saved images
      const savedImagesJson = localStorage.getItem("mewtic_saved_images");
      const savedImages = savedImagesJson ? JSON.parse(savedImagesJson) : [];
      
      // Check if image is already saved
      const isAlreadySaved = savedImages.some((img: GeneratedImage) => 
        img.imageURL === selectedImage.imageURL
      );
      
      if (isAlreadySaved) {
        toast.info("Image already saved to library");
        return;
      }
      
      // Add new image to saved images
      const updatedSavedImages = [selectedImage, ...savedImages];
      localStorage.setItem("mewtic_saved_images", JSON.stringify(updatedSavedImages));
      
      toast.success("Image saved to library");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save image");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-purple-50 px-4 py-12 md:py-20">
      <Toaster position="top-center" />
      
      <header className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-block px-4 py-1 mb-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
              Image Generation
            </div>
            <h1 className="text-3xl font-semibold">Mewtic Generator</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/library">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Library className="h-4 w-4" />
                Library
              </Button>
            </Link>
            {apiKey && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Key className="h-4 w-4" />
                    Change API Key
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Update API Key</SheetTitle>
                    <SheetDescription>
                      Enter your new Runware API key
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6">
                    <ApiKeyInput onSubmit={handleApiKeySubmit} />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        {!apiKey ? (
          <ApiKeyInput onSubmit={handleApiKeySubmit} />
        ) : (
          <>
            <ImagePrompt 
              onSubmit={handlePromptSubmit} 
              isGenerating={isGenerating}
              initialPrompt={selectedImage?.positivePrompt}
            />
            
            <div className="mt-12">
              {selectedImage ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ImageDisplay image={selectedImage} />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-medium">Image Details</h2>
                      <Button 
                        onClick={handleSaveImage} 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Save className="h-4 w-4" />
                        Save to Library
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-purple-500">Prompt</span>
                        <p className="mt-1">{selectedImage.positivePrompt}</p>
                      </div>
                      <div>
                        <span className="text-sm text-purple-500">Seed</span>
                        <p className="mt-1">{selectedImage.seed}</p>
                      </div>
                      <div>
                        <span className="text-sm text-purple-500">Model</span>
                        <p className="mt-1">runware:100@1</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-purple-50 rounded-2xl p-10 text-center animate-fade-in">
                  <h3 className="text-xl font-medium mb-2">No images generated yet</h3>
                  <p className="text-purple-500 mb-4">
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

      <footer className="max-w-5xl mx-auto mt-20 pt-6 border-t border-purple-100 text-center text-sm text-purple-400">
        <p>© {new Date().getFullYear()} Mewtic. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
