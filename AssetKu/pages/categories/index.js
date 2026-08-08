// pages/categories/index.js
// ----------------------------------------------------------------------
// Halaman "Kategori" ("/categories"). Menampilkan daftar kategori barang
// dalam bentuk kartu (grid), lengkap dengan fitur Tambah / Ubah / Hapus.
// Backend akan menolak penghapusan kategori yang masih memiliki aset,
// untuk menjaga integritas data (lihat pages/api/categories/[id].js).
// ----------------------------------------------------------------------

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/store/slices/categoriesSlice";
import { showToast } from "@/store/slices/uiSlice";
import CategoryFormModal from "@/components/CategoryFormModal";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function CategoriesPage() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);
  const status = useAppSelector((state) => state.categories.status);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Muat data kategori sekali saat halaman pertama kali dibuka
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function openAddModal() {
    setEditingCategory(null);
    setModalOpen(true);
  }

  function openEditModal(category) {
    setEditingCategory(category);
    setModalOpen(true);
  }

  async function handleFormSubmit(formValues) {
    const isEditing = Boolean(editingCategory);
    const result = isEditing
      ? await dispatch(updateCategory({ id: editingCategory.id, payload: formValues }))
      : await dispatch(createCategory(formValues));

    const isSuccess = isEditing
      ? updateCategory.fulfilled.match(result)
      : createCategory.fulfilled.match(result);

    if (isSuccess) {
      dispatch(
        showToast({
          type: "success",
          message: isEditing
            ? "Perubahan kategori berhasil disimpan."
            : "Kategori baru berhasil ditambahkan.",
        })
      );
      setModalOpen(false);
    } else {
      dispatch(
        showToast({ type: "error", message: result.payload || "Terjadi kesalahan pada sistem." })
      );
    }
  }

  async function handleConfirmDelete() {
    const result = await dispatch(deleteCategory(deleteTarget.id));
    if (deleteCategory.fulfilled.match(result)) {
      dispatch(showToast({ type: "success", message: "Kategori berhasil dihapus." }));
    } else {
      dispatch(
        showToast({ type: "error", message: result.payload || "Kategori gagal dihapus." })
      );
    }
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kategori Barang</h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelompokkan aset berdasarkan jenisnya untuk memudahkan pengelolaan inventaris.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 self-start"
        >
          + Tambah Kategori
        </button>
      </div>

      {status === "loading" && <p className="text-slate-500 text-sm">Memuat kategori...</p>}

      {status !== "loading" && categories.length === 0 && (
        <p className="text-slate-400 text-sm bg-white border border-slate-100 rounded-xl p-6 text-center">
          Belum ada kategori yang terdaftar. Klik &quot;Tambah Kategori&quot; untuk membuat kategori pertama.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">{cat.name}</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">
                  {cat._count?.assets ?? 0} aset
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                {cat.description || "Belum ada deskripsi untuk kategori ini."}
              </p>
            </div>
            <div className="flex gap-3 mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => openEditModal(cat)}
                className="text-indigo-600 hover:underline text-xs font-medium"
              >
                Ubah
              </button>
              <button
                onClick={() => setDeleteTarget(cat)}
                className="text-red-600 hover:underline text-xs font-medium"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <CategoryFormModal
          key={editingCategory?.id ?? "new"}
          open={modalOpen}
          initialData={editingCategory}
          onClose={() => setModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Konfirmasi Hapus Kategori"
        message={`Anda akan menghapus kategori "${deleteTarget?.name}" secara permanen. Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
