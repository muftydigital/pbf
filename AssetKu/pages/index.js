// pages/index.js
// ----------------------------------------------------------------------
// Halaman Dashboard (halaman utama "/"). Menampilkan ringkasan statistik
// inventaris: total aset, total nilai aset, jumlah kategori, aset rusak,
// aset dengan stok menipis, rekap per kategori, dan aset terbaru.
//
// Halaman ini memakai React Hooks useState & useEffect secara langsung
// (tanpa Redux) untuk mengambil data dari /api/dashboard, sebagai contoh
// pola "local data fetching" untuk data yang sifatnya khusus 1 halaman.
// ----------------------------------------------------------------------

import { useEffect, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import { formatRupiah, formatTanggal } from "@/lib/format";

export default function DashboardPage() {
  // State untuk menyimpan data statistik yang diambil dari API
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect dengan dependency array kosong [] artinya kode di dalamnya
  // hanya dijalankan SATU KALI, tepat setelah komponen pertama kali
  // selesai dirender (mirip componentDidMount di class component).
  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const response = await fetch("/api/dashboard");
        if (!response.ok) throw new Error("Gagal memuat statistik dashboard.");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  // Cari jumlah maksimum pada rekap kategori, untuk menghitung lebar bar chart
  const maxCategoryTotal = stats?.perCategory?.length
    ? Math.max(...stats.perCategory.map((c) => c.total))
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Pantau kondisi dan nilai inventaris organisasi Anda secara menyeluruh dan real-time.
        </p>
      </div>

      {loading && <p className="text-slate-500 text-sm">Memuat data dashboard...</p>}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
          {error}
        </p>
      )}

      {stats && !loading && (
        <>
          {/* ------------------------- KARTU STATISTIK ------------------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Unit Aset" value={stats.totalAssets} icon="📦" color="indigo" />
            <StatCard
              label="Total Nilai Aset"
              value={formatRupiah(stats.totalValue)}
              icon="💰"
              color="emerald"
            />
            <StatCard label="Jumlah Kategori" value={stats.totalCategories} icon="🗂️" color="amber" />
            <StatCard
              label="Aset Perlu Perhatian"
              value={`${stats.damagedCount} rusak · ${stats.lowStockCount} stok menipis`}
              icon="⚠️"
              color="rose"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ------------------------- REKAP PER KATEGORI ------------------------- */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h2 className="font-semibold text-slate-800 mb-4">Distribusi Aset per Kategori</h2>
              {stats.perCategory.length === 0 ? (
                <p className="text-sm text-slate-400">Belum tersedia data aset untuk ditampilkan.</p>
              ) : (
                <div className="space-y-3">
                  {stats.perCategory.map((cat) => (
                    <div key={cat.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">{cat.name}</span>
                        <span className="font-medium text-slate-800">{cat.total}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{
                            width: `${maxCategoryTotal ? (cat.total / maxCategoryTotal) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ------------------------- ASET TERBARU ------------------------- */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-800">Aset Terbaru</h2>
                <Link href="/assets" className="text-sm text-indigo-600 hover:underline">
                  Lihat Semua Aset →
                </Link>
              </div>
              {stats.recentAssets.length === 0 ? (
                <p className="text-sm text-slate-400">Belum ada aset yang tercatat dalam sistem.</p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {stats.recentAssets.map((asset) => (
                    <li key={asset.id} className="py-2 flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-slate-700">{asset.name}</p>
                        <p className="text-slate-400 text-xs">
                          {asset.code} · {formatTanggal(asset.createdAt)}
                        </p>
                      </div>
                      <span className="text-slate-500">{asset.quantity} {asset.unit}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
