
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { GeneratedImage } from "@/services/runware.service";

const Library = () => {
  const [savedImages, setSavedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved images from localStorage
    const loadImages = () => {
      try {
        const savedImagesJson = localStorage.getItem("unix_saved_images");
        if (savedImagesJson) {
          const images = JSON.parse(savedImagesJson);
          setSavedImages(images);
        }
      } catch (error) {
        console.error("Error loading saved images:", error);
        toast.error("Failed to load your saved images");
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...savedImages];
    updatedImages.splice(index, 1);
    
    try {
      localStorage.setItem("unix_saved_images", JSON.stringify(updatedImages));
      setSavedImages(updatedImages);
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <Toaster position="top-center" />
      
      <header className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Your Image Library</h1>
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 rounded-full border-4 border-unix-accent/20 border-t-unix-accent animate-spin"></div>
          </div>
        ) : savedImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {savedImages.map((image, index) => (
              <Card key={image.imageUUID || index} className="overflow-hidden">
                <div className="aspect-square relative group">
                  <img 
                    src={image.imageURL} 
                    alt={image.positivePrompt} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteImage(index)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm line-clamp-2">{image.positivePrompt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-unix-subtle rounded-2xl p-10 text-center">
            <h3 className="text-xl font-medium mb-2">No saved images yet</h3>
            <p className="text-unix-muted mb-6">
              Start creating images and save them to your library
            </p>
            <Link to="/generator">
              <Button className="unix-button">
                Create Images
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Library;
