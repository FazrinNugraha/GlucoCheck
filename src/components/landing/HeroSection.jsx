import { ArrowUpRight, CheckCircle2, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F8F9FA] relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-16">
          
          {/* Left Column - Text & CTA */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.h1 
              variants={fadeUp}
              className="text-[42px] leading-[1.1] md:text-[52px] lg:text-[68px] font-bold text-[#2D1B4E] tracking-tight mb-6"
            >
              Kenali risiko <br className="hidden md:block" />
              kesehatan Anda <br className="hidden md:block" />
              lebih awal.
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="text-base md:text-lg text-gray-500 mb-8 md:mb-10 max-w-md mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Mendukung Anda dengan analisis sederhana, insight mendalam, dan rekomendasi pola hidup sehat yang mudah dipahami.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate("/gluco-check")}
                className="w-full sm:w-auto px-8 py-4 bg-[#9D4EDD] text-white rounded-lg font-medium text-base hover:bg-[#853bbf] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#9D4EDD]/20"
              >
                Cek Sekarang <ArrowUpRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Partners Mockup */}
            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8 opacity-60">
              <span className="text-xl md:text-2xl font-bold text-[#2D1B4E] tracking-tighter">Siloam</span>
              <span className="text-lg md:text-xl font-bold text-[#2D1B4E]">PRODIA</span>
              <span className="text-lg md:text-xl font-semibold text-[#2D1B4E]">KimiaFarma</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Floating Cards UI */}
          <motion.div 
            className="flex-1 relative w-full max-w-[340px] md:max-w-md mx-auto lg:max-w-none mt-10 md:mt-16 lg:mt-0 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[360px]">
              {/* Main Background Card */}
              <div className="w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(45,27,78,0.08)] p-6 relative z-10 border border-gray-50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#9D4EDD] rounded-lg flex items-center justify-center text-white font-bold">
                    GC
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2D1B4E]">Profil Kesehatan</h4>
                    <p className="text-xs text-gray-400">Diperbarui hari ini</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-gray-400 mb-1">Skor Risiko Diabetes</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B4E]">Rendah</h2>
                  <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Kondisi Ideal
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#9D4EDD]" />
                      <span className="text-sm font-medium text-[#2D1B4E]">Gula Darah</span>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Tekanan Darah</span>
                    </div>
                    <div className="w-3 h-3 rounded-full border-2 border-gray-200"></div>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-[#2D1B4E] text-white rounded-lg text-sm font-medium hover:bg-[#1f1235] transition-colors">
                  Lihat Detail
                </button>
              </div>

              {/* Floating Top Card */}
              <motion.div 
                className="absolute -bottom-8 -right-4 md:top-10 md:-right-8 w-[200px] md:w-[240px] bg-gradient-to-br from-[#9D4EDD] to-[#7b36b5] rounded-xl shadow-xl z-20 p-4 md:p-5 text-white flex flex-col justify-between h-[100px] md:h-[120px]"
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-medium opacity-80">Status Gizi</span>
                  <Activity className="w-4 h-4 md:w-5 md:h-5 opacity-80" />
                </div>
                <div className="mt-auto">
                  <p className="text-xl md:text-2xl font-bold tracking-widest">Normal</p>
                  <p className="text-[10px] md:text-xs opacity-80 mt-1">BMI: 21.5</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
