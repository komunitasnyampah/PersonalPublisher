import { Link } from "wouter";
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";
import logoImage from "@assets/Nyampah_Bersama_Logo png_1751206526334.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2" id="footer-main">
            <div className="flex items-center space-x-3 mb-4" id="footer-logo">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src={logoImage} 
                  alt="Nyampah Bersama Logo" 
                  className="w-12 h-12 object-contain filter brightness-0 invert"
                  id="footer-logo-image"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold" id="footer-title">NYAMPAH</h2>
                <p className="text-gray-400" id="footer-subtitle">NYAMPAH BERSAMA</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md" id="footer-description">
              Membangun masa depan berkelanjutan bersama melalui berbagi pengetahuan, aksi komunitas, dan teknologi inovatif.
            </p>
            <div className="flex space-x-4" id="footer-social-links">
              <a href="#" className="text-gray-400 hover:text-eco-green transition-colors" id="social-twitter">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-green transition-colors" id="social-linkedin">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-green transition-colors" id="social-github">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-green transition-colors" id="social-discord">
                <FaDiscord className="text-xl" />
              </a>
            </div>
          </div>
          <div id="footer-community">
            <h3 className="text-lg font-semibold mb-4">Komunitas</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" id="link-guidelines">Panduan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" id="link-events">Acara</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" id="link-contributors">Kontributor</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" id="link-newsletter">Newsletter</a></li>
            </ul>
          </div>
          <div id="footer-resources">
            <h3 className="text-lg font-semibold mb-4">Sumber Daya</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" id="link-documentation">Dokumentasi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" id="link-api">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" id="link-help">Pusat Bantuan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" id="link-contact">Kontak</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center" id="footer-bottom">
          <p className="text-gray-400 text-sm" id="footer-copyright">© 2024 Nyampah Bersama. Semua hak dilindungi.</p>
          <div className="flex space-x-6 mt-4 md:mt-0" id="footer-legal-links">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors" id="link-privacy">Kebijakan Privasi</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors" id="link-terms">Syarat Layanan</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors" id="link-cookies">Kebijakan Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
