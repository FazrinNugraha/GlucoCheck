import { Activity } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row justify-between gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="lg:w-1/4">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="bg-[#1A0B2E] w-8 h-8 rounded flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-[#1A0B2E] tracking-tight">GlucoCheck</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
              Platform informatif untuk mendeteksi dini risiko diabetes. Tetap utamakan konsultasi dengan dokter untuk penilaian kesehatan medis yang akurat.
            </p>
          </div>
          
          <div className="lg:w-2/4 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-[#1A0B2E] mb-4 md:mb-6 text-sm">Solusi</h4>
              <ul className="space-y-3 md:space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#A855F7] transition-colors">Personal</a></li>
                <li><a href="#" className="hover:text-[#A855F7] transition-colors">Keluarga</a></li>
                <li><a href="#" className="hover:text-[#A855F7] transition-colors">Komunitas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#1A0B2E] mb-4 md:mb-6 text-sm">Perusahaan</h4>
              <ul className="space-y-3 md:space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#A855F7] transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-[#A855F7] transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-[#A855F7] transition-colors">Kontak</a></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-bold text-[#1A0B2E] mb-4 md:mb-6 text-sm">Pelajari</h4>
              <ul className="space-y-3 md:space-y-4 text-sm text-gray-500 flex sm:flex-col gap-4 sm:gap-0 flex-wrap">
                <li><a href="#" className="hover:text-[#A855F7] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#A855F7] transition-colors">Panduan</a></li>
                <li><a href="#" className="hover:text-[#A855F7] transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="lg:w-1/4">
             <h4 className="font-bold text-[#1A0B2E] mb-4 md:mb-6 text-sm">Pengembang</h4>
             <p className="text-gray-500 text-sm">Muhamad Fazrin Nugraha</p>
             <p className="text-gray-500 text-sm">Mahasiswa Informatika</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-gray-400 text-xs md:text-sm order-2 md:order-1">
            © {new Date().getFullYear()} GlucoCheck. Hak cipta dilindungi.
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-500 order-1 md:order-2 flex-wrap">
            <a href="#" className="hover:text-[#1A0B2E] transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-[#1A0B2E] transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
