import { UserCircle, FileQuestion, PieChart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 md:gap-10 mb-12 md:mb-16">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <span className="text-xs font-bold text-[#A855F7] uppercase tracking-wider mb-3 md:mb-4 block">
              CARA KERJA
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A0B2E] tracking-tight leading-tight">
              Langkah mudah, <br className="hidden md:block" /> hasil akurat
            </h2>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-5/12 pt-0 lg:pt-4 text-center lg:text-left"
          >
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              GlucoCheck memproses data kesehatan dasar Anda dengan algoritma terstruktur untuk memberikan insight risiko secara efisien dan aman.
            </p>
          </motion.div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* Card 1 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} variants={fadeUp}
            className="bg-white border border-gray-100 p-8 md:p-10 flex flex-col h-full rounded-2xl md:rounded-sm shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-8 md:mb-12">
              <UserCircle className="w-10 h-10 md:w-12 md:h-12 text-[#1A0B2E]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#1A0B2E] mb-3 md:mb-4">Isi Data Pribadi</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 md:mb-16">
              Masukkan informasi dasar usia dan ukuran tubuh Anda tanpa perlu melakukan registrasi akun yang rumit.
            </p>
            <div className="mt-auto">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                <ArrowUpRight className="w-4 h-4 text-[#1A0B2E]" />
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} variants={fadeUp}
            className="bg-white border border-gray-100 p-8 md:p-10 flex flex-col h-full rounded-2xl md:rounded-sm shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-8 md:mb-12">
              <FileQuestion className="w-10 h-10 md:w-12 md:h-12 text-[#1A0B2E]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#1A0B2E] mb-3 md:mb-4">Jawab Kuesioner</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 md:mb-16">
              Luangkan 2 menit menjawab pertanyaan sederhana seputar gaya hidup dan riwayat kesehatan untuk prediksi yang lebih presisi.
            </p>
            <div className="mt-auto">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                <ArrowUpRight className="w-4 h-4 text-[#1A0B2E]" />
              </div>
            </div>
          </motion.div>

          {/* Card 3 (Highlighted) */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.3 }} variants={fadeUp}
            className="bg-[#F4EBFF] p-8 md:p-10 flex flex-col h-full sm:col-span-2 lg:col-span-1 rounded-2xl md:rounded-sm md:rounded-tr-[5rem] shadow-sm"
          >
            <div className="mb-8 md:mb-12">
              <div className="w-10 h-10 md:w-12 md:h-12 relative">
                <div className="absolute inset-0 border border-[#1A0B2E] rounded-full"></div>
                <div className="absolute inset-1 border border-[#1A0B2E] rounded-full translate-x-1 translate-y-1"></div>
                <PieChart className="absolute inset-0 m-auto w-5 h-5 md:w-6 md:h-6 text-[#1A0B2E]" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#1A0B2E] mb-3 md:mb-4">Hasil Instan</h3>
            <p className="text-[#2D1B4E]/80 text-sm leading-relaxed mb-10 md:mb-16">
              Hasil analisis risiko muncul secara instan beserta saran dan rekomendasi spesifik untuk pencegahan sedini mungkin.
            </p>
            <div className="mt-auto">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1A0B2E] flex items-center justify-center hover:bg-[#2D1B4E] transition-colors cursor-pointer">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
