// pages/api/categories/index.js
// ----------------------------------------------------------------------
// API Route untuk koleksi kategori (tanpa ID spesifik):
//   GET  /api/categories  -> mengambil semua kategori
//   POST /api/categories  -> membuat kategori baru
// ----------------------------------------------------------------------

import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  // req.method berisi jenis HTTP request yang dikirim client (GET/POST/dst)
  if (req.method === "GET") {
    try {
      // Ambil semua kategori dari database, urutkan berdasarkan nama (A-Z).
      // "_count" menghitung jumlah aset yang terhubung ke tiap kategori,
      // berguna untuk ditampilkan di halaman kategori.
      const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
        include: {
          _count: { select: { assets: true } },
        },
      });
      return res.status(200).json(categories);
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
      return res.status(500).json({ message: "Gagal mengambil data kategori." });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, description } = req.body;

      // Validasi sederhana: nama kategori wajib diisi
      if (!name || !name.trim()) {
        return res.status(400).json({ message: "Nama kategori wajib diisi." });
      }

      const category = await prisma.category.create({
        data: {
          name: name.trim(),
          description: description?.trim() || null,
        },
      });

      return res.status(201).json(category);
    } catch (error) {
      // Kode error P2002 dari Prisma berarti pelanggaran constraint "unique"
      if (error.code === "P2002") {
        return res.status(409).json({ message: "Nama kategori sudah digunakan." });
      }
      console.error("Gagal membuat kategori:", error);
      return res.status(500).json({ message: "Gagal membuat kategori baru." });
    }
  }

  // Jika method selain GET/POST, tolak dengan status 405 (Method Not Allowed)
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Metode ${req.method} tidak diizinkan.` });
}
