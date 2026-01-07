import { UserCircle, FileQuestion, PieChart, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    step: "01",
    title: "Isi Data Pribadi",
    description: "Masukkan informasi dasar seperti usia, berat badan, dan tinggi badan Anda."
  },
  {
    icon: FileQuestion,
    step: "02",
    title: "Jawab Pertanyaan",
    description: "Jawab beberapa pertanyaan singkat tentang gaya hidup dan riwayat kesehatan."
  },
  {
    icon: PieChart,
    step: "03",
    title: "Lihat Hasil Analisis",
    description: "Dapatkan hasil analisis risiko diabetes Anda secara instan."
  },
  {
    icon: HeartPulse,
    step: "04",
    title: "Terapkan Tips",
    description: "Ikuti rekomendasi kesehatan untuk menjaga gula darah tetap stabil."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Cara Kerja</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            4 Langkah Mudah
          </h2>
          <p className="text-muted-foreground text-lg">
            Proses yang simpel untuk membantu Anda memahami kondisi kesehatan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-[#b7b7b7]" />
              )}

              <div className="relative z-10 text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-purple-400 opacity-20 animate-pulse-soft" />
                  <div className="relative w-20 h-20 rounded-full bg-white border-2 border-[#e79aff] flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-[#e79aff]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#e79aff] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
