// pages/api/dashboard.js
// ----------------------------------------------------------------------
// API Route khusus untuk menyediakan data ringkasan (statistik) yang
// ditampilkan di halaman Dashboard, seperti:
//   - total jumlah aset & total nilai kekayaan aset
//   - jumlah kategori
//   - jumlah aset dengan kondisi rusak
//   - jumlah aset dengan stok menipis (quantity <= 2)
//   - rekap jumlah aset per kategori (untuk grafik sederhana)
// ----------------------------------------------------------------------

import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Metode ${req.method} tidak diizinkan.` });
  }

  try {
    // Ambil semua aset sekaligus beserta kategorinya. Untuk skala data
    // inventaris kantor/organisasi (ratusan-ribuan baris), pendekatan
    // ini masih efisien dan menyederhanakan perhitungan statistik di JS.
    const assets = await prisma.asset.findMany({ include: { category: true } });
    const totalCategories = await prisma.category.count();

    const totalAssets = assets.reduce((sum, a) => sum + a.quantity, 0);
    const totalValue = assets.reduce((sum, a) => sum + a.quantity * a.price, 0);
    const damagedCount = assets.filter((a) => a.condition !== "Baik").length;
    const lowStockCount = assets.filter((a) => a.quantity <= 2).length;

    // Rekap jumlah aset per kategori menggunakan sebuah objek sebagai "map"
    const perCategoryMap = {};
    for (const asset of assets) {
      const key = asset.category?.name || "Tanpa Kategori";
      perCategoryMap[key] = (perCategoryMap[key] || 0) + asset.quantity;
    }
    const perCategory = Object.entries(perCategoryMap).map(([name, total]) => ({
      name,
      total,
    }));

    // Ambil 5 aset yang paling baru ditambahkan untuk ditampilkan di dashboard
    const recentAssets = [...assets]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    return res.status(200).json({
      totalAssets,
      totalItems: assets.length,
      totalValue,
      totalCategories,
      damagedCount,
      lowStockCount,
      perCategory,
      recentAssets,
    });
  } catch (error) {
    console.error("Gagal mengambil statistik dashboard:", error);
    return res.status(500).json({ message: "Gagal mengambil statistik dashboard." });
  }
}
