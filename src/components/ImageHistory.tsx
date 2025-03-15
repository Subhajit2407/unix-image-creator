
import type { GeneratedImage } from "@/services/runware.service";

interface ImageHistoryProps {
  images: GeneratedImage[];
  onSelect: (image: GeneratedImage) => void;
  selectedImage: GeneratedImage | null;
}

const ImageHistory = ({ images, onSelect, selectedImage }: ImageHistoryProps) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 animate-fade-in">
      <h3 className="text-lg font-medium mb-4">Recent Images</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div 
            key={image.imageUUID || index}
            className={`
              relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300
              ${selectedImage?.imageUUID === image.imageUUID ? 'ring-2 ring-unix-accent shadow-lg' : 'hover:opacity-90 hover:shadow-md'}
              group
            `}
            onClick={() => onSelect(image)}
          >
            <img 
              src={image.imageURL} 
              alt={image.positivePrompt} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs line-clamp-2">
                {image.positivePrompt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageHistory;
