// pages/api/categories/[id].js
// ----------------------------------------------------------------------
// API Route dinamis untuk satu kategori spesifik berdasarkan ID:
//   PUT    /api/categories/:id  -> mengubah data kategori
//   DELETE /api/categories/:id  -> menghapus kategori
// Next.js otomatis membaca "id" dari nama file [id].js sebagai parameter URL.
// ----------------------------------------------------------------------

import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  // req.query.id -> nilai dinamis dari URL, misal /api/categories/3 -> id = "3"
  const id = Number(req.query.id);

  if (!id || Number.isNaN(id)) {
    return res.status(400).json({ message: "ID kategori tidak valid." });
  }

  if (req.method === "PUT") {
    try {
      const { name, description } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ message: "Nama kategori wajib diisi." });
      }

      const category = await prisma.category.update({
        where: { id },
        data: {
          name: name.trim(),
          description: description?.trim() || null,
        },
      });

      return res.status(200).json(category);
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(409).json({ message: "Nama kategori sudah digunakan." });
      }
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Kategori tidak ditemukan." });
      }
      console.error("Gagal mengubah kategori:", error);
      return res.status(500).json({ message: "Gagal mengubah data kategori." });
    }
  }

  if (req.method === "DELETE") {
    try {
      // Cek dulu apakah kategori masih memiliki aset terkait.
      // Jika masih ada, jangan izinkan penghapusan supaya data aset
      // tidak menjadi "yatim" (kehilangan kategori induknya).
      const assetCount = await prisma.asset.count({ where: { categoryId: id } });
      if (assetCount > 0) {
        return res.status(409).json({
          message: `Kategori tidak dapat dihapus karena masih memiliki ${assetCount} aset terkait.`,
        });
      }

      await prisma.category.delete({ where: { id } });
      return res.status(200).json({ message: "Kategori berhasil dihapus." });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Kategori tidak ditemukan." });
      }
      console.error("Gagal menghapus kategori:", error);
      return res.status(500).json({ message: "Gagal menghapus kategori." });
    }
  }

  res.setHeader("Allow", ["PUT", "DELETE"]);
  return res.status(405).json({ message: `Metode ${req.method} tidak diizinkan.` });
}
