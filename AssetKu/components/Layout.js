// components/Layout.js
// ----------------------------------------------------------------------
// Komponen pembungkus (layout) yang dipakai di semua halaman.
// Berisi Navbar navigasi di bagian atas dan area konten di bawahnya.
// Dipisah menjadi komponen sendiri supaya navbar tidak perlu ditulis
// ulang di setiap halaman (prinsip "Don't Repeat Yourself").
// ----------------------------------------------------------------------

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Toast from "@/components/Toast";

// Daftar menu navigasi, disimpan sebagai array supaya mudah ditambah/diubah.
// `title` dipakai untuk judul tab browser (lihat komponen <Head> di bawah).
const NAV_ITEMS = [
  { href: "/", label: "Dashboard", title: "Dashboard" },
  { href: "/assets", label: "Data Aset", title: "Manajemen Aset" },
  { href: "/categories", label: "Kategori", title: "Kategori Barang" },
  { href: "/about", label: "Tentang", title: "Tentang Aplikasi" },
];

export default function Layout({ children }) {
  // useRouter -> React Hook bawaan Next.js untuk mengetahui path URL saat ini,
  // dipakai untuk memberi highlight pada menu navigasi yang sedang aktif
  // sekaligus menentukan judul tab browser yang sesuai.
  const router = useRouter();
  const currentPage = NAV_ITEMS.find((item) => item.href === router.pathname);
  const pageTitle = currentPage ? `${currentPage.title} · AssetKu` : "AssetKu";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="AssetKu — solusi manajemen inventaris barang yang modern, cepat, dan mudah digunakan."
        />
      </Head>

      {/* ------------------------- NAVBAR ------------------------- */}
      <header className="bg-indigo-700 text-white shadow-md sticky top-0 z-30">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            {/* Logo sederhana berupa kotak dengan inisial "A" */}
            <span className="w-8 h-8 rounded-lg bg-white text-indigo-700 flex items-center justify-center font-black">
              A
            </span>
            AssetKu
          </Link>

          <ul className="flex items-center gap-1 sm:gap-2 flex-wrap justify-end">
            {NAV_ITEMS.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white text-indigo-700"
                        : "text-indigo-100 hover:bg-indigo-600 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* ------------------------- KONTEN HALAMAN ------------------------- */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">{children}</main>

      {/* ------------------------- FOOTER ------------------------- */}
      <footer className="text-center text-xs text-slate-400 py-4 border-t border-slate-200">
        &copy; {new Date().getFullYear()} AssetKu. Seluruh hak cipta dilindungi.
      </footer>

      {/* Toast notifikasi global, tampil di atas semua halaman */}
      <Toast />
    </div>
  );
}
