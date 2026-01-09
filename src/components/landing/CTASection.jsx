import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleCheckNow = () => {
    navigate("/gluco-check");
  };

  return (
    <section className="py-20 relative overflow-hidden bg-[#f3ccff]">
      <div className="absolute inset-0 gradient-primary opacity-95" />
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary-foreground/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-primary-foreground/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ayo Mulai Peduli Terhadap Kesehatan Penyakit Diabetes
          </h2>

          <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Manfaatkan sistem analisis berbasis AI untuk memahami risiko diabetes Anda dalam hitungan menit.
          </p>

          <button
            onClick={handleCheckNow}
            className="
              bg-white
              inline-flex items-center gap-2
              px-8 py-4
              rounded-xl
              font-semibold text-lg
              text-
              hover:bg-gray-50
              hover:shadow-lg
              hover:scale-105
              transition-all duration-300
              group
            "
          >
            Ayo Cek Sekarang
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;