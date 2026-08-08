/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Nonaktifkan pembuatan otomatis AGENTS.md/CLAUDE.md oleh Next.js,
  // karena tidak dibutuhkan untuk kebutuhan tugas ini.
  agentRules: false,

  // Jangan bocorkan versi Next.js lewat header "X-Powered-By" (praktik keamanan dasar).
  poweredByHeader: false,

  // Menambahkan header keamanan standar pada setiap response, berlaku untuk
  // semua environment (development & production) dan semua route.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Mencegah browser menebak-nebak tipe konten (mitigasi MIME sniffing).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Mencegah halaman aplikasi ditaruh dalam <iframe> milik domain lain (mitigasi clickjacking).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Batasi informasi referrer yang dikirim saat pengguna berpindah ke situs lain.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Nonaktifkan akses ke API sensor perangkat yang tidak dipakai aplikasi ini.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
