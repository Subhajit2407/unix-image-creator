
import { ArrowRight, Sparkles, Library } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <div className="flex flex-col items-center text-center">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-unix-subtle text-unix-muted text-sm font-medium">
              AI Image Generation
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Unix</h1>
            <p className="text-xl text-unix-muted max-w-2xl mx-auto mb-10">
              Bring your imagination to life with our AI-powered image generation. 
              Create beautiful, unique images with just a simple text prompt.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/generator">
                <Button className="unix-button px-8 py-6 text-base">
                  Start Creating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/library">
                <Button variant="outline" className="px-8 py-6 text-base">
                  View Library
                  <Library className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-unix-subtle/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-unix-muted max-w-2xl mx-auto">
              Create stunning visuals in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-soft flex flex-col items-center text-center">
              <div className="w-14 h-14 flex items-center justify-center bg-unix-accent/10 rounded-full text-unix-accent mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Your Prompt</h3>
              <p className="text-unix-muted">
                Describe the image you want to create using simple text prompts.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-soft flex flex-col items-center text-center">
              <div className="w-14 h-14 flex items-center justify-center bg-unix-accent/10 rounded-full text-unix-accent mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Generate</h3>
              <p className="text-unix-muted">
                Our AI transforms your text into stunning visuals in seconds.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-soft flex flex-col items-center text-center">
              <div className="w-14 h-14 flex items-center justify-center bg-unix-accent/10 rounded-full text-unix-accent mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Download & Share</h3>
              <p className="text-unix-muted">
                Save your creations to your library or download them directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create?</h2>
          <p className="text-unix-muted max-w-2xl mx-auto mb-10">
            Get started with Unix and transform your ideas into stunning visuals today.
          </p>
          
          <Link to="/generator">
            <Button className="unix-button px-8 py-6 text-base">
              Start Creating
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-unix-subtle py-8">
        <div className="container mx-auto px-4 text-center text-unix-muted">
          <p>© {new Date().getFullYear()} Unix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
