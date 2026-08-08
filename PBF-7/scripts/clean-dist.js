// rmSync digunakan untuk membersihkan folder hasil build sebelumnya.
import { rmSync } from 'node:fs';

// Tentukan lokasi folder dist dari posisi file script ini.
const distFolder = new URL('../dist/', import.meta.url);

// Hapus folder dist beserta isinya dan abaikan jika folder belum tersedia.
rmSync(distFolder, { recursive: true, force: true });
