import { ArrowRight, Shield, Zap, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleCheckNow = () => {
    navigate("/gluco-check");
  };

  return (
    <section className="bg-[#f3f6f4] relative min-h-screen gradient-hero pt-24 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="bg-[#f6f6f6] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-[#e79aff]" />
            <span className="text-[#e79aff]">Cek Risiko Diabetes Anda Secara Gratis</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-fade-in">
            Kenali Risiko Diabetes
            <br />
            <span className="text-[#e79aff]"> Sebelum Terlambat </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in">
            GlucoCheck membantu Anda memahami risiko diabetes berdasarkan gaya hidup dan kondisi kesehatan Anda. Cepat, mudah, dan akurat.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in">
            <button
              onClick={handleCheckNow}
              className="
                bg-[#e79aff]
                text-white
                inline-flex items-center gap-2
                px-8 py-4
                rounded-xl
                bg-primary text-primary-foreground
                font-semibold text-lg
                hover:bg-primary/90
                transition-all duration-300
                group
              "
            >
              Ayo Cek Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-sm text-muted-foreground">
              Hanya butuh 2 menit • Gratis selamanya
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in-up">
            <div className="bg-white bg-card rounded-2xl p-6 shadow-card  ">
              <div className="bg-[#e79aff] w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-foreground text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">2 Menit</h3>
              <p className="text-muted-foreground text-sm">Waktu pengisian</p>
            </div>

            <div className="bg-white bg-card rounded-2xl p-6 shadow-card  ">
              <div className="bg-[#e79aff] w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary-foreground text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">100%</h3>
              <p className="text-muted-foreground text-sm">Data aman & privat</p>
            </div>

            <div className="bg-white bg-card rounded-2xl p-6 shadow-card  ">
              <div className="bg-[#e79aff] w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary-foreground text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">10K+</h3>
              <p className="text-muted-foreground text-sm">Pengguna terbantu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
