
import { useState, useEffect } from "react";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { GeneratedImage } from "@/services/runware.service";

interface ImageDisplayProps {
  image: GeneratedImage;
}

const ImageDisplay = ({ image }: ImageDisplayProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setImageLoaded(false);
  }, [image.imageURL]);

  const handleDownload = async () => {
    try {
      const response = await fetch(image.imageURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `unix-image-${Date.now()}.webp`;
      
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Image downloaded successfully");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Unix Generated Image',
          text: image.positivePrompt,
          url: image.imageURL,
        });
        toast.success("Shared successfully");
      } else {
        await navigator.clipboard.writeText(image.imageURL);
        toast.success("Image URL copied to clipboard");
      }
    } catch (error) {
      console.error("Share error:", error);
      toast.error("Failed to share image");
    }
  };

  return (
    <div className="image-card w-full animate-scale-in">
      <div className="relative aspect-square w-full overflow-hidden">
        {isLoading && !imageLoaded && (
          <div className="absolute inset-0 bg-unix-subtle flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-unix-accent/20 border-t-unix-accent animate-spin"></div>
          </div>
        )}
        
        <img
          src={image.imageURL}
          alt={image.positivePrompt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => {
            setImageLoaded(true);
            setIsLoading(false);
          }}
        />
      </div>
      
      <div className="p-4 flex flex-col gap-2">
        <p className="text-sm text-unix-muted line-clamp-2">{image.positivePrompt}</p>
        
        <div className="flex gap-2 mt-2">
          <Button onClick={handleDownload} className="unix-icon-button flex-1" size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleShare} className="unix-icon-button flex-1" size="sm" variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
