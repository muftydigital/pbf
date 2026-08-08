// components/AssetFormModal.js
// ----------------------------------------------------------------------
// Modal form untuk menambah ATAU mengubah data aset (satu komponen
// dipakai untuk dua keperluan, dibedakan lewat props `initialData`).
// Memakai React Hook useState (dengan fungsi inisialisasi/lazy init)
// untuk menyimpan nilai form secara lokal. Komponen ini sengaja di-mount
// ulang oleh parent-nya (lewat prop `key`) setiap kali dibuka dengan data
// yang berbeda, sehingga state form otomatis "segar" tanpa perlu
// useEffect untuk mensinkronkan ulang (pola ini lebih direkomendasikan
// React dibanding setState di dalam useEffect).
// ----------------------------------------------------------------------

import { useState } from "react";
import { toDateInputValue } from "@/lib/format";

// Nilai default form saat menambah aset baru (bukan mode edit)
const EMPTY_FORM = {
  name: "",
  categoryId: "",
  quantity: 1,
  unit: "unit",
  location: "",
  condition: "Baik",
  price: 0,
  purchaseDate: "",
  notes: "",
};

const CONDITIONS = ["Baik", "Rusak Ringan", "Rusak Berat"];

// Mengubah data aset (dari API) menjadi bentuk yang siap dipakai oleh form
function buildInitialForm(initialData) {
  if (!initialData) return EMPTY_FORM;
  return {
    name: initialData.name ?? "",
    categoryId: initialData.categoryId ?? "",
    quantity: initialData.quantity ?? 1,
    unit: initialData.unit ?? "unit",
    location: initialData.location ?? "",
    condition: initialData.condition ?? "Baik",
    price: initialData.price ?? 0,
    purchaseDate: toDateInputValue(initialData.purchaseDate),
    notes: initialData.notes ?? "",
  };
}

export default function AssetFormModal({ open, categories, initialData, onClose, onSubmit }) {
  // Lazy initializer (fungsi di dalam useState) hanya dijalankan SEKALI
  // saat komponen pertama kali di-mount, memakai data awal yang relevan
  // (kosong untuk tambah baru, atau terisi untuk mode ubah).
  const [form, setForm] = useState(() => buildInitialForm(initialData));

  if (!open) return null;

  // Handler generic untuk semua input teks/number/select berdasarkan atribut "name"
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // mencegah reload halaman saat form disubmit
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          {initialData ? "Ubah Data Aset" : "Tambah Aset Baru"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Aset */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Aset *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Contoh: Laptop Asus X441"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kategori *</label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Pilih kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Kondisi */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kondisi</label>
              <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Jumlah */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Jumlah</label>
              <input
                type="number"
                min="0"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Satuan */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Satuan</label>
              <input
                name="unit"
                value={form.unit}
                onChange={handleChange}
                placeholder="unit"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Harga Satuan */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Harga (Rp)</label>
              <input
                type="number"
                min="0"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Lokasi */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Contoh: Ruang IT"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Tanggal Perolehan */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tanggal Perolehan
              </label>
              <input
                type="date"
                name="purchaseDate"
                value={form.purchaseDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Catatan</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Catatan tambahan (opsional)"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
