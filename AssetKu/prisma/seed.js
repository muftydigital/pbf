// prisma/seed.js
// ----------------------------------------------------------------------
// Script untuk mengisi database dengan data contoh (dummy data), supaya
// saat aplikasi pertama kali dijalankan (misal di CodeSandbox) sudah
// ada data yang bisa langsung dilihat & didemokan, tidak kosong melompong.
//
// Dijalankan dengan perintah: npm run db:seed
// (ditulis dengan CommonJS/require karena dijalankan langsung oleh Node,
// bukan lewat bundler Next.js)
// ----------------------------------------------------------------------

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Menghapus data lama...");
  // Hapus data lama dulu supaya seed bisa dijalankan berkali-kali tanpa error duplikat
  await prisma.asset.deleteMany();
  await prisma.category.deleteMany();

  console.log("Membuat data kategori...");
  const [elektronik, furnitur, atk, kendaraan] = await Promise.all([
    prisma.category.create({
      data: { name: "Elektronik", description: "Perangkat elektronik & komputer kantor" },
    }),
    prisma.category.create({
      data: { name: "Furnitur", description: "Meja, kursi, lemari, dan perabot kantor lainnya" },
    }),
    prisma.category.create({
      data: { name: "Alat Tulis Kantor", description: "Perlengkapan tulis & administrasi" },
    }),
    prisma.category.create({
      data: { name: "Kendaraan", description: "Kendaraan operasional milik instansi" },
    }),
  ]);

  console.log("Membuat data aset contoh...");
  await prisma.asset.createMany({
    data: [
      {
        code: "AST-0001",
        name: "Laptop Asus X441",
        categoryId: elektronik.id,
        quantity: 5,
        unit: "unit",
        location: "Ruang IT",
        condition: "Baik",
        price: 6500000,
        purchaseDate: new Date("2024-01-15"),
        notes: "Digunakan tim development",
      },
      {
        code: "AST-0002",
        name: "Proyektor Epson EB-X05",
        categoryId: elektronik.id,
        quantity: 2,
        unit: "unit",
        location: "Ruang Meeting",
        condition: "Baik",
        price: 4200000,
        purchaseDate: new Date("2023-11-02"),
      },
      {
        code: "AST-0003",
        name: "Printer Canon Pixma",
        categoryId: elektronik.id,
        quantity: 1,
        unit: "unit",
        location: "Ruang Admin",
        condition: "Rusak Ringan",
        price: 1500000,
        purchaseDate: new Date("2022-06-20"),
        notes: "Cartridge perlu diganti",
      },
      {
        code: "AST-0004",
        name: "Meja Kerja Kayu",
        categoryId: furnitur.id,
        quantity: 12,
        unit: "unit",
        location: "Ruang Staff",
        condition: "Baik",
        price: 850000,
        purchaseDate: new Date("2023-03-10"),
      },
      {
        code: "AST-0005",
        name: "Kursi Kantor Ergonomis",
        categoryId: furnitur.id,
        quantity: 15,
        unit: "unit",
        location: "Ruang Staff",
        condition: "Baik",
        price: 950000,
        purchaseDate: new Date("2023-03-10"),
      },
      {
        code: "AST-0006",
        name: "Lemari Arsip Besi",
        categoryId: furnitur.id,
        quantity: 1,
        unit: "unit",
        location: "Ruang Arsip",
        condition: "Rusak Berat",
        price: 1200000,
        purchaseDate: new Date("2019-08-05"),
        notes: "Engsel pintu patah, menunggu perbaikan",
      },
      {
        code: "AST-0007",
        name: "Kertas HVS A4",
        categoryId: atk.id,
        quantity: 40,
        unit: "rim",
        location: "Gudang ATK",
        condition: "Baik",
        price: 55000,
        purchaseDate: new Date("2026-01-05"),
      },
      {
        code: "AST-0008",
        name: "Tinta Printer Refill",
        categoryId: atk.id,
        quantity: 2,
        unit: "botol",
        location: "Gudang ATK",
        condition: "Baik",
        price: 85000,
        purchaseDate: new Date("2026-02-01"),
      },
      {
        code: "AST-0009",
        name: "Mobil Operasional Avanza",
        categoryId: kendaraan.id,
        quantity: 1,
        unit: "unit",
        location: "Area Parkir",
        condition: "Baik",
        price: 220000000,
        purchaseDate: new Date("2021-05-18"),
        notes: "Plat nomor B 1234 XYZ",
      },
      {
        code: "AST-0010",
        name: "Motor Operasional Vario",
        categoryId: kendaraan.id,
        quantity: 2,
        unit: "unit",
        location: "Area Parkir",
        condition: "Baik",
        price: 22000000,
        purchaseDate: new Date("2022-09-01"),
      },
    ],
  });

  console.log("Seeding selesai!");
}

main()
  .catch((error) => {
    console.error("Gagal melakukan seeding:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
