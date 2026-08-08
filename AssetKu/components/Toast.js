// components/Toast.js
// ----------------------------------------------------------------------
// Komponen notifikasi kecil (toast) yang muncul di pojok kanan-bawah
// layar untuk memberi feedback ke pengguna (contoh: "Aset berhasil
// ditambahkan" atau "Terjadi kesalahan"). Data toast diambil dari Redux
// store (state.ui.toast) supaya bisa dipicu dari komponen mana saja
// tanpa perlu prop-drilling.
// ----------------------------------------------------------------------

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearToast } from "@/store/slices/uiSlice";

export default function Toast() {
  const toast = useAppSelector((state) => state.ui.toast);
  const dispatch = useAppDispatch();

  // useEffect ini membuat toast otomatis hilang sendiri setelah 3 detik,
  // meniru perilaku notifikasi pada umumnya.
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => dispatch(clearToast()), 3000);
    // Bersihkan timer lama jika toast berganti sebelum 3 detik berlalu
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-[fadeIn_0.2s_ease-out]">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${
          isError ? "bg-red-600" : "bg-emerald-600"
        }`}
      >
        <span>{isError ? "⚠️" : "✅"}</span>
        <span>{toast.message}</span>
        <button
          onClick={() => dispatch(clearToast())}
          className="ml-2 text-white/80 hover:text-white"
          aria-label="Tutup notifikasi"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
