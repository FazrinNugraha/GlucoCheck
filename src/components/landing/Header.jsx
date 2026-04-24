import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BrandLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3C16 3 5 12.5 5 20.5C5 26.8513 10.1487 32 16 32C21.8513 32 27 26.8513 27 20.5C27 12.5 16 3 16 3Z" fill="url(#paint0_linear)" />
    <path d="M11 21L14.5 24.5L21.5 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="paint0_linear" x1="16" y1="3" x2="16" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#c45de8" />
        <stop offset="1" stopColor="#2D1B4E" />
      </linearGradient>
    </defs>
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none">
      <div className="mx-auto max-w-6xl pointer-events-auto">
        <div 
          className={`transition-all duration-300 rounded-[2rem] px-3 py-2 md:px-4 md:py-2.5 flex items-center justify-between ${
            isScrolled 
              ? "bg-white/60 backdrop-blur-lg border border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.05)]" 
              : "bg-white border border-gray-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          }`}
        >
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer pl-1 md:pl-2" onClick={() => navigate("/")}>
            <div className="bg-white border border-gray-100 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
              <BrandLogo className="w-6 h-6" />
            </div>
            <span className="text-[17px] font-bold text-[#1A0B2E] tracking-wide hidden sm:block uppercase">
              GlucoCheck
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 lg:gap-10">
            <a href="#" className="text-[15px] font-medium text-gray-600 hover:text-[#1A0B2E] transition-colors">
              Beranda
            </a>
            <a href="#features" className="text-[15px] font-medium text-gray-600 hover:text-[#1A0B2E] transition-colors">
              Fitur
            </a>
            <a href="#how-it-works" className="text-[15px] font-medium text-gray-600 hover:text-[#1A0B2E] transition-colors">
              Cara Kerja
            </a>
            <a href="#about" className="text-[15px] font-medium text-gray-600 hover:text-[#1A0B2E] transition-colors">
              Tentang Kami
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 pr-1">
            <button 
              onClick={() => navigate("/gluco-check")}
              className="px-6 py-2.5 text-[15px] font-medium text-white bg-[#9D4EDD] hover:bg-[#853bbf] rounded-full shadow-sm transition-colors"
            >
              Mulai Gratis
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center pr-1">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-[#1A0B2E] p-2 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-[80px] left-4 right-4 bg-white border border-gray-100 rounded-2xl flex flex-col p-5 shadow-xl md:hidden z-40 pointer-events-auto">
          <nav className="flex flex-col gap-1">
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-base text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors">Beranda</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-base text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors">Fitur</a>
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-base text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors">Cara Kerja</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-base text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors">Tentang Kami</a>
            <div className="h-px w-full bg-gray-100 my-2"></div>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/gluco-check");
              }}
              className="w-full mt-2 px-4 py-3.5 text-base font-medium text-white bg-[#9D4EDD] rounded-xl flex items-center justify-center shadow-md"
            >
              Mulai Gratis
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
