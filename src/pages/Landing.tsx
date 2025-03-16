
import { ArrowRight, Sparkles, Library } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-600 via-purple-600 to-orange-500 text-white overflow-hidden">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-3xl font-bold">MEWTIC</div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-blue-200 transition-colors">Home</a>
            <a href="#about" className="hover:text-blue-200 transition-colors">About</a>
            <a href="#features" className="hover:text-blue-200 transition-colors">Services</a>
            <a href="#contact" className="hover:text-blue-200 transition-colors">Contact</a>
          </div>
          <Link to="/generator">
            <Button className="bg-white text-purple-600 hover:bg-blue-100 transition-all">
              Start Creating
            </Button>
          </Link>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-12 pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="block">MEW</span>
              <span className="inline-flex items-center">
                <span className="inline-block w-12 h-12 rounded-full bg-cyan-400 mx-2"></span>
                TIC
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-md">
              Bring your imagination to life with our AI-powered image generation.
              Create beautiful, unique images with just a simple text prompt.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/generator" className="group">
                <Button variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-600 rounded-full px-8 py-6">
                  Discover
                  <span className="ml-2 w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </Link>
              <Link to="/library">
                <Button variant="outline" className="border-2 border-cyan-400 bg-transparent text-white hover:bg-cyan-400 hover:text-purple-800 rounded-full px-8 py-6">
                  <span className="mr-2 w-8 h-8 rounded-full bg-cyan-400 text-purple-800 flex items-center justify-center">
                    <span className="font-bold">AI</span>
                  </span>
                  Connect
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <img 
              src="/lovable-uploads/5feb59e2-ae96-4e07-bf63-2d3fcdf1e4cb.png" 
              alt="Futuristic VR headset" 
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl z-10 relative"
            />
            <div className="absolute -top-10 -left-10 w-full h-full bg-cyan-400 rounded-lg filter blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Features Section with cards */}
      <div className="container mx-auto px-4 py-20" id="features">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-purple-700/50 backdrop-blur-lg rounded-xl p-6 relative overflow-hidden group hover:bg-purple-600/60 transition-all duration-300">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-pink-500/30 blur-xl"></div>
            <div className="relative z-10 flex gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="/lovable-uploads/108bac81-8998-4dce-8778-0c348862eab7.png" 
                  alt="Feature" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Driven By Passion</h3>
                <p className="text-blue-100 text-sm">
                  Pushing the boundaries of what's possible in the world of AI image generation.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-700/50 backdrop-blur-lg rounded-xl p-6 relative overflow-hidden group hover:bg-purple-600/60 transition-all duration-300">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-cyan-500/30 blur-xl"></div>
            <div className="relative z-10 flex gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="/lovable-uploads/d567d4dc-a00c-4aac-9e74-67c36d3f3cb7.png" 
                  alt="Feature" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Creative Imagination</h3>
                <p className="text-blue-100 text-sm">
                  Transform text into stunning visuals with our advanced AI technology.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-700/50 backdrop-blur-lg rounded-xl p-6 relative overflow-hidden group hover:bg-purple-600/60 transition-all duration-300">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-orange-500/30 blur-xl"></div>
            <div className="relative z-10 flex gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="/lovable-uploads/8e9568d8-a20f-4fc0-989a-d92fb359bbc6.png" 
                  alt="Feature" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Software Solutions</h3>
                <p className="text-blue-100 text-sm">
                  Tailored to your unique needs, bringing your creative vision to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-20" id="about">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">We redesign the future</h2>
          <p className="text-xl text-blue-100 mb-10">
            Of software design and innovation as a service. Create stunning AI-generated images with 
            our intuitive platform. Simply describe what you want, and watch as our AI brings your 
            vision to life in seconds.
          </p>
          
          <Link to="/generator">
            <Button className="bg-white text-purple-600 hover:bg-blue-100 transition-all px-8 py-6 text-lg">
              Start Creating
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="fixed right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col gap-4">
          <a href="#" className="w-3 h-3 rounded-full bg-white"></a>
          <a href="#features" className="w-2 h-2 rounded-full bg-blue-200 hover:bg-white hover:w-3 hover:h-3 transition-all"></a>
          <a href="#about" className="w-2 h-2 rounded-full bg-blue-200 hover:bg-white hover:w-3 hover:h-3 transition-all"></a>
          <a href="#contact" className="w-2 h-2 rounded-full bg-blue-200 hover:bg-white hover:w-3 hover:h-3 transition-all"></a>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-20" id="contact">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create?</h2>
          <p className="text-blue-100 mb-8">
            Get started with Mewtic and transform your ideas into stunning visuals today.
          </p>
          
          <Link to="/generator">
            <Button className="bg-white text-purple-600 hover:bg-blue-100 transition-all px-8 py-6 text-lg w-full">
              Start Creating
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-500/30 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-blue-200">
          <p>© {new Date().getFullYear()} Mewtic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
