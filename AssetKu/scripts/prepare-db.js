// scripts/prepare-db.js
// ----------------------------------------------------------------------
// Script ini memastikan database SQLite siap sebelum aplikasi dijalankan.
// Schema Prisma selalu disinkronkan lebih dulu. Jika database masih kosong,
// data contoh akan dimasukkan agar aplikasi langsung bisa didemokan.
// ----------------------------------------------------------------------

const { execFileSync } = require("child_process");
const path = require("path");

// Menentukan perintah npx yang sesuai dengan sistem operasi.
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

function run(command, args) {
  // Menjalankan perintah dan meneruskan output-nya ke terminal.
  execFileSync(command, args, {
    cwd: path.resolve(__dirname, ".."),
    stdio: "inherit",
    env: process.env,
  });
}

async function main() {
  // Menyamakan struktur database dengan schema.prisma.
  run(npxCommand, ["prisma", "db", "push"]);

  // Prisma Client baru dipanggil setelah schema database sudah siap.
  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  try {
    // Cek apakah database sudah mempunyai kategori.
    const categoryCount = await prisma.category.count();

    // Seed hanya dijalankan jika database masih kosong agar data pengguna
    // tidak ter-reset setiap kali server development di-restart.
    if (categoryCount === 0) {
      run(process.execPath, [path.join("prisma", "seed.js")]);
    }
  } finally {
    // Menutup koneksi Prisma setelah pemeriksaan selesai.
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Gagal menyiapkan database:", error);
  process.exit(1);
});
