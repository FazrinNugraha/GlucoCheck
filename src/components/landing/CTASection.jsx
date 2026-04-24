import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="bg-[#1A0B2E] rounded-[1.5rem] md:rounded-[2.5rem] py-12 px-6 md:py-20 md:px-12 lg:px-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-[#A855F7]/10 blur-[80px] md:blur-[120px] pointer-events-none" />

          <div className="w-full lg:w-2/3 relative z-10 text-center lg:text-left">
            <span className="text-[10px] md:text-xs font-bold text-[#A855F7] uppercase tracking-wider mb-3 md:mb-4 block">
              COBA SEKARANG
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
              Siap untuk meningkatkan <br className="hidden sm:block" /> peduli kesehatan Anda?
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              Analisis risiko diabetes sederhana dengan teknologi yang mendukung pola hidup sehat Anda.
            </p>
          </div>

          <div className="w-full lg:w-1/3 relative z-10 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-end">
            <button
              onClick={() => navigate("/gluco-check")}
              className="w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-[#A855F7] text-white rounded-xl font-medium hover:bg-[#9333ea] transition-all flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base"
            >
              Mulai Sekarang
            </button>
            <button className="w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-transparent border border-white/20 text-white rounded-xl font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base">
              Pelajari <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;