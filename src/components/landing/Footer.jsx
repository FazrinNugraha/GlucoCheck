import { Activity, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer id="about" className="bg-foreground py-12 bg-[#9656ce]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-background">GlucoCheck</span>
          </div>
          
          <p className="text-muted-foreground text-sm text-center md:text-left">
            Disclaimer: GlucoCheck bersifat informatif dan bukan pengganti diagnosis medis profesional.
          </p>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span>Dibuat dengan</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>untuk Indonesia</span>
          </div>
        </div>
        
        <div className="border-t border-muted mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} GlucoCheck. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
