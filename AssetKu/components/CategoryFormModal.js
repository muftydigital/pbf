// components/CategoryFormModal.js
// ----------------------------------------------------------------------
// Modal form sederhana untuk menambah/mengubah data kategori.
// Strukturnya mirip AssetFormModal.js: state form diinisialisasi lewat
// lazy initializer di useState, dan komponen di-mount ulang oleh parent
// (lewat prop `key`) setiap kali target edit berganti.
// ----------------------------------------------------------------------

import { useState } from "react";

const EMPTY_FORM = { name: "", description: "" };

function buildInitialForm(initialData) {
  if (!initialData) return EMPTY_FORM;
  return { name: initialData.name ?? "", description: initialData.description ?? "" };
}

export default function CategoryFormModal({ open, initialData, onClose, onSubmit }) {
  const [form, setForm] = useState(() => buildInitialForm(initialData));

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          {initialData ? "Ubah Kategori" : "Tambah Kategori Baru"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nama Kategori *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Contoh: Elektronik"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Deskripsi singkat kategori (opsional)"
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
