/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Tambahkan domain gambar eksternal jika ada
  },
  // Pastikan variabel lingkungan publik di sini
  env: {
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    // Tambahkan variabel lingkungan publik lainnya di sini
  },
};

module.exports = nextConfig;
