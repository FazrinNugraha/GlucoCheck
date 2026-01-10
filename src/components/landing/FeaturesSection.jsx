import { ClipboardList, BarChart3, Lightbulb, Lock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ClipboardList,
    title: "Pertanyaan Mudah",
    description:
      "Jawab pertanyaan sederhana tentang gaya hidup dan kesehatan Anda dalam hitungan menit.",
  },
  {
    icon: BarChart3,
    title: "Analisis Akurat",
    description:
      "Algoritma kami menganalisis data Anda untuk memberikan estimasi risiko yang terpercaya.",
  },
  {
    icon: Lightbulb,
    title: "Personalisasi",
    description:
      "Dapatkan tips kesehatan yang disesuaikan dengan kondisi dan kebutuhan Anda.",
  },
  {
    icon: Lock,
    title: "Privasi Terjamin",
    description:
      "Data Anda tidak disimpan didalam apapun dan hanya digunakan untuk analisis real-time.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Fitur Unggulan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Kenapa Memilih GlucoCheck?
          </h2>
          <p className="text-muted-foreground text-lg">
            Platform Kami memberikan pengalaman cek kesehatan risiko diabetes dengan cepat, gratis, informatif
            berbasis teknologi AI terkini.
          </p>
        </motion.div>

        {/* FEATURE CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#F8FAFC] group rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-purple-600 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-purple-600 group-hover:text-white transition-all duration-300" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">
                {feature.title}
              </h3>

              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
