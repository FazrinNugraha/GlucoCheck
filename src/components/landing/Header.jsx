import { Activity } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 w-10 h-10 rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">GlucoCheck</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
            Fitur
          </a>
          <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
            Cara Kerja
          </a>
          <a href="#about" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
            Tentang
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
