// pages/api/assets/[id].js
// ----------------------------------------------------------------------
// API Route dinamis untuk satu aset spesifik berdasarkan ID:
//   GET    /api/assets/:id  -> mengambil detail satu aset
//   PUT    /api/assets/:id  -> mengubah data aset
//   DELETE /api/assets/:id  -> menghapus aset
// ----------------------------------------------------------------------

import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const id = Number(req.query.id);

  if (!id || Number.isNaN(id)) {
    return res.status(400).json({ message: "ID aset tidak valid." });
  }

  if (req.method === "GET") {
    try {
      const asset = await prisma.asset.findUnique({
        where: { id },
        include: { category: true },
      });
      if (!asset) {
        return res.status(404).json({ message: "Aset tidak ditemukan." });
      }
      return res.status(200).json(asset);
    } catch (error) {
      console.error("Gagal mengambil detail aset:", error);
      return res.status(500).json({ message: "Gagal mengambil detail aset." });
    }
  }

  if (req.method === "PUT") {
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

      if (!name || !name.trim()) {
        return res.status(400).json({ message: "Nama aset wajib diisi." });
      }
      if (!categoryId) {
        return res.status(400).json({ message: "Kategori wajib dipilih." });
      }

      const asset = await prisma.asset.update({
        where: { id },
        data: {
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

      return res.status(200).json(asset);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Aset tidak ditemukan." });
      }
      console.error("Gagal mengubah aset:", error);
      return res.status(500).json({ message: "Gagal mengubah data aset." });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.asset.delete({ where: { id } });
      return res.status(200).json({ message: "Aset berhasil dihapus dari sistem." });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Aset tidak ditemukan." });
      }
      console.error("Gagal menghapus aset:", error);
      return res.status(500).json({ message: "Gagal menghapus aset." });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ message: `Metode ${req.method} tidak diizinkan.` });
}
