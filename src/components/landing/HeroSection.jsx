import { ArrowRight, Shield, Zap, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const HeroSection = () => {
  const navigate = useNavigate();

  const handleCheckNow = () => {
    navigate("/gluco-check");
  };

  return (
    <section className="bg-[#f3f6f4] relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium mb-8"
          >
            <Shield className="w-4 h-4 text-[#e79aff]" />
            <span className="text-[#e79aff]">
              Cek Risiko Diabetes Anda Secara Gratis
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
          >
            Kenali Risiko Diabetes
            <br />
            <span className="text-[#e79aff]"> Sebelum Terlambat </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            GlucoCheck membantu Anda memahami risiko diabetes berdasarkan gaya
            hidup dan kondisi kesehatan Anda. Cepat, mudah, dan akurat.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={handleCheckNow}
              className="
                bg-[#e79aff]
                text-white
                inline-flex items-center gap-2
                px-8 py-4
                rounded-xl
                font-semibold text-lg
                hover:bg-[#d67eef]
                hover:shadow-lg
                hover:scale-105
                transition-all duration-300
                group
              "
            >
              Buruan Cek Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-sm text-muted-foreground">
              Hanya butuh 2 menit <br />
              Untuk mengetahui risiko Anda
            </p>

          </motion.div>

          {/* Stats */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: Zap, title: "2 Menit", desc: "Waktu pengisian" },
              { icon: Shield, title: "100%", desc: "Data terjamin aman" },
              { icon: Heart, title: "10K+", desc: "Sudah mencoba fitur ini" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <div className="bg-[#e79aff] w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
