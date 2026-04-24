import { Repeat, LayoutGrid, ShieldCheck, CheckCircle2, TrendingUp, Users, Activity, LineChart, Apple } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        
        {/* Section 1: Features Grid */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mb-24 md:mb-32 pt-10"
        >
          {/* Centered Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A0B2E] leading-tight tracking-tight mb-4 md:mb-6">
              Fitur Lengkap untuk Pantau <br className="hidden sm:block" /> Kesehatan Anda
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Sistem GlucoCheck menyediakan alat yang komprehensif untuk membantu Anda mendeteksi, mencatat, dan mencegah risiko diabetes sejak dini.
            </p>
          </div>

          {/* Grid of 6 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <Activity className="w-5 h-5 text-gray-700" strokeWidth={2} />
              </div>
              <h3 className="text-[19px] font-bold text-[#1A0B2E] mb-2.5">Analisis Cerdas</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Evaluasi tingkat risiko diabetes menggunakan algoritma pemrosesan data profil dan gaya hidup Anda secara instan.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <LineChart className="w-5 h-5 text-gray-700" strokeWidth={2} />
              </div>
              <h3 className="text-[19px] font-bold text-[#1A0B2E] mb-2.5">Riwayat Terpadu</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Pantau perkembangan rekam jejak gula darah dan tekanan darah Anda dari waktu ke waktu dengan visualisasi yang jelas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <Repeat className="w-5 h-5 text-gray-700" strokeWidth={2} />
              </div>
              <h3 className="text-[19px] font-bold text-[#1A0B2E] mb-2.5">Gratis Sepenuhnya</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Nikmati seluruh layanan pemantauan dan analisis risiko kesehatan secara gratis tanpa batasan penggunaan atau biaya tersembunyi.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-5 h-5 text-gray-700" strokeWidth={2} />
              </div>
              <h3 className="text-[19px] font-bold text-[#1A0B2E] mb-2.5">Keamanan Privasi</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Infrastruktur kami memastikan perlindungan penuh atas data kesehatan Anda dengan standar enkripsi yang ketat.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <LayoutGrid className="w-5 h-5 text-gray-700" strokeWidth={2} />
              </div>
              <h3 className="text-[19px] font-bold text-[#1A0B2E] mb-2.5">Akses Multi-Platform</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Kelola profil kesehatan Anda kapan saja dan di mana saja. Kompatibel penuh di ponsel pintar, tablet, maupun desktop.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <Apple className="w-5 h-5 text-gray-700" strokeWidth={2} />
              </div>
              <h3 className="text-[19px] font-bold text-[#1A0B2E] mb-2.5">Rekomendasi Pintar</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Terima insight dan anjuran spesifik terkait pola hidup serta kebiasaan sehat yang sesuai dengan kondisi profil Anda.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Section 2: Key Benefits (Left-Right Layout) */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Left Column: UI Mockup */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0"
          >
            <div className="relative w-[90%] sm:w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[440px]">
              {/* Main Background UI Card */}
              <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-400 mb-2">Total Tes Kesehatan</h4>
                <div className="flex items-end gap-3 mb-6 sm:mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#1A0B2E]">14,285</h2>
                  <span className="text-xs sm:text-sm font-medium text-emerald-500 flex items-center mb-1">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> 24%
                  </span>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <div className="flex justify-between text-[10px] sm:text-xs font-medium text-gray-500 mb-2">
                      <span>Kondisi Ideal</span>
                      <span className="text-[#1A0B2E]">65%</span>
                    </div>
                    <div className="w-full h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-[65%] h-full bg-emerald-400 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] sm:text-xs font-medium text-gray-500 mb-2">
                      <span>Risiko Sedang</span>
                      <span className="text-[#1A0B2E]">25%</span>
                    </div>
                    <div className="w-full h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-[25%] h-full bg-amber-400 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] sm:text-xs font-medium text-gray-500 mb-2">
                      <span>Risiko Tinggi</span>
                      <span className="text-[#1A0B2E]">10%</span>
                    </div>
                    <div className="w-full h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-[10%] h-full bg-rose-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Dummy Bar Chart */}
                <div className="flex items-end gap-1.5 sm:gap-2 mt-8 sm:mt-10 h-16 sm:h-24">
                  {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm ${i % 2 === 0 ? 'bg-[#2D1B4E]' : 'bg-[#9D4EDD]'}`} style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>

              {/* Floating Highlight Card */}
              <div className="absolute -bottom-8 -right-2 sm:-bottom-8 sm:-right-8 w-[160px] sm:w-[220px] bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 text-emerald-600">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 mb-1">Pengguna Aktif</p>
                <h3 className="text-xl sm:text-3xl font-bold text-[#1A0B2E] mb-1 sm:mb-2">10k+</h3>
                <p className="text-[8px] sm:text-[10px] text-gray-400 leading-tight">Terus bertambah setiap bulannya</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="w-full lg:w-1/2 pt-10 lg:pt-0"
          >
            <h2 className="text-3xl sm:text-4xl md:text-[42px] leading-tight font-bold text-[#1A0B2E] tracking-tight mb-6">
              Manfaat Utama Sistem Kami untuk Kesehatan Anda
            </h2>
            <p className="text-gray-500 text-lg mb-10">
              Sistem GlucoCheck membantu Anda mendeteksi dini risiko, mengoptimalkan pola hidup, dan menjaga kualitas kesehatan dengan lebih baik.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#1A0B2E] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A0B2E] mb-2">Akurasi Analisis Cerdas</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Sistem kami memanfaatkan pemrosesan data untuk memprediksi tingkat risiko kesehatan secara presisi berdasarkan informasi gaya hidup Anda.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#1A0B2E] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A0B2E] mb-2">Evaluasi Kondisi Instan</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Dapatkan hasil pemeriksaan secara langsung tanpa perlu menunggu lama, memungkinkan Anda mengambil tindakan pencegahan sedini mungkin.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#1A0B2E] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A0B2E] mb-2">Rekomendasi Pola Hidup</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Terima saran khusus yang dirancang untuk menjaga gula darah tetap stabil dan memaksimalkan kualitas kesehatan Anda dalam jangka panjang.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
