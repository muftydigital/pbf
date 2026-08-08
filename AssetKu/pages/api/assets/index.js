// pages/api/assets/index.js
// ----------------------------------------------------------------------
// API Route untuk koleksi aset (tanpa ID spesifik):
//   GET  /api/assets  -> mengambil daftar aset (bisa difilter & dicari)
//   POST /api/assets  -> menambah aset baru
// ----------------------------------------------------------------------

import { prisma } from "@/lib/prisma";

// Fungsi bantu untuk membuat kode aset otomatis, contoh: AST-0001, AST-0002, dst.
// Kode dibuat berdasarkan aset terakhir yang tersimpan di database.
async function generateAssetCode() {
  const lastAsset = await prisma.asset.findFirst({
    orderBy: { id: "desc" },
    select: { id: true },
  });
  const nextNumber = (lastAsset?.id ?? 0) + 1;
  // padStart(4, "0") -> memastikan angka selalu 4 digit, misal 7 jadi "0007"
  return `AST-${String(nextNumber).padStart(4, "0")}`;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Ambil parameter query dari URL, misal: /api/assets?search=laptop&categoryId=2
      const { search, categoryId, condition } = req.query;

      // "where" dibangun secara dinamis, hanya menambahkan filter yang
      // benar-benar dikirim oleh client agar query tetap fleksibel.
      const where = {};

      if (search) {
        // "contains" -> mencari data yang mengandung kata kunci pada nama/kode
        where.OR = [
          { name: { contains: search } },
          { code: { contains: search } },
          { location: { contains: search } },
        ];
      }

      if (categoryId) {
        where.categoryId = Number(categoryId);
      }

      if (condition) {
        where.condition = condition;
      }

      const assets = await prisma.asset.findMany({
        where,
        include: { category: true }, // sertakan detail kategori terkait
        orderBy: { createdAt: "desc" }, // aset terbaru ditampilkan lebih dulu
      });

      return res.status(200).json(assets);
    } catch (error) {
      console.error("Gagal mengambil aset:", error);
      return res.status(500).json({ message: "Gagal mengambil data aset." });
    }
  }

  if (req.method === "POST") {
    try {
      const {
        name,
        categoryId,
        quantity,
        unit,
        location,
        condition,
        price,
        purchaseDate,
        notes,
      } = req.body;

      // Validasi field wajib
      if (!name || !name.trim()) {
        return res.status(400).json({ message: "Nama aset wajib diisi." });
      }
      if (!categoryId) {
        return res.status(400).json({ message: "Kategori wajib dipilih." });
      }

      const code = await generateAssetCode();

      const asset = await prisma.asset.create({
        data: {
          code,
          name: name.trim(),
          categoryId: Number(categoryId),
          quantity: quantity ? Number(quantity) : 1,
          unit: unit?.trim() || "unit",
          location: location?.trim() || null,
          condition: condition || "Baik",
          price: price ? Number(price) : 0,
          purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
          notes: notes?.trim() || null,
        },
        include: { category: true },
      });

      return res.status(201).json(asset);
    } catch (error) {
      console.error("Gagal membuat aset:", error);
      return res.status(500).json({ message: "Gagal membuat aset baru." });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Metode ${req.method} tidak diizinkan.` });
}
