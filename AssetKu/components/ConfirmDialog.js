// components/ConfirmDialog.js
// ----------------------------------------------------------------------
// Dialog konfirmasi generic, dipakai sebelum melakukan aksi yang tidak
// bisa dibatalkan (contoh: menghapus aset/kategori). Menerima beberapa
// props supaya bisa dipakai ulang untuk konteks apapun.
// ----------------------------------------------------------------------

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  // Jika "open" bernilai false, komponen tidak me-render apa-apa sama sekali
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
