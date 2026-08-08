// pages/assets/index.js
// ----------------------------------------------------------------------
// Halaman "Data Aset" ("/assets"). Ini adalah halaman inti aplikasi:
// menampilkan tabel semua aset, mendukung pencarian & filter, serta
// menyediakan fitur Tambah / Ubah / Hapus (CRUD lengkap) yang semuanya
// dikelola lewat Redux (assetsSlice & categoriesSlice).
// ----------------------------------------------------------------------

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAssets, createAsset, updateAsset, deleteAsset } from "@/store/slices/assetsSlice";
import { fetchCategories } from "@/store/slices/categoriesSlice";
import { setSearchTerm, setFilterCategoryId, setFilterCondition, showToast, resetFilters } from "@/store/slices/uiSlice";
import { useDebounce } from "@/hooks/useDebounce";
import AssetFormModal from "@/components/AssetFormModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import { formatRupiah, formatTanggal } from "@/lib/format";

const CONDITION_BADGE = {
  Baik: "bg-emerald-100 text-emerald-700",
  "Rusak Ringan": "bg-amber-100 text-amber-700",
  "Rusak Berat": "bg-rose-100 text-rose-700",
};

export default function AssetsPage() {
  const dispatch = useAppDispatch();

  // Membaca state dari Redux store menggunakan custom hook useAppSelector
  const assets = useAppSelector((state) => state.assets.items);
  const assetsStatus = useAppSelector((state) => state.assets.status);
  const categories = useAppSelector((state) => state.categories.items);
  const { searchTerm, filterCategoryId, filterCondition } = useAppSelector((state) => state.ui);

  // Debounce kata kunci pencarian selama 400ms supaya tidak memanggil API
  // di setiap ketukan keyboard, cukup setelah pengguna berhenti mengetik.
  const debouncedSearch = useDebounce(searchTerm, 400);

  // State lokal (bukan Redux) untuk mengatur modal form & dialog konfirmasi.
  // Ini murni state UI sementara yang tidak perlu dibagikan ke komponen lain.
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Ambil data kategori sekali saat halaman pertama kali dibuka
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Ambil ulang daftar aset setiap kali filter (search/kategori/kondisi) berubah
  useEffect(() => {
    dispatch(
      fetchAssets({
        search: debouncedSearch,
        categoryId: filterCategoryId,
        condition: filterCondition,
      })
    );
  }, [dispatch, debouncedSearch, filterCategoryId, filterCondition]);

  // useMemo dipakai supaya perhitungan total nilai tabel yang sedang tampil
  // tidak dihitung ulang di setiap render, kecuali daftar `assets` berubah.
  const totalDisplayedValue = useMemo(
    () => assets.reduce((sum, a) => sum + a.quantity * a.price, 0),
    [assets]
  );

  function openAddModal() {
    setEditingAsset(null);
    setModalOpen(true);
  }

  function openEditModal(asset) {
    setEditingAsset(asset);
    setModalOpen(true);
  }

  // Menangani submit form (dipakai untuk tambah maupun ubah data).
  // isEditing disimpan lebih dulu karena `editingAsset` bisa saja berubah
  // sebelum promise di bawah selesai (misalnya modal ditutup lalu dibuka lagi).
  async function handleFormSubmit(formValues) {
    const isEditing = Boolean(editingAsset);
    const result = isEditing
      ? await dispatch(updateAsset({ id: editingAsset.id, payload: formValues }))
      : await dispatch(createAsset(formValues));

    const isSuccess = isEditing ? updateAsset.fulfilled.match(result) : createAsset.fulfilled.match(result);

    if (isSuccess) {
      dispatch(
        showToast({
          type: "success",
          message: isEditing
            ? "Perubahan data aset berhasil disimpan."
            : "Aset baru berhasil ditambahkan ke sistem.",
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
    const result = await dispatch(deleteAsset(deleteTarget.id));
    if (deleteAsset.fulfilled.match(result)) {
      dispatch(showToast({ type: "success", message: "Aset berhasil dihapus dari sistem." }));
    } else {
      dispatch(showToast({ type: "error", message: result.payload || "Aset gagal dihapus." }));
    }
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Aset</h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola seluruh data barang inventaris secara terpusat dan terorganisir.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 self-start"
        >
          + Tambah Aset
        </button>
      </div>

      {/* ------------------------- FILTER & PENCARIAN ------------------------- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col md:flex-row gap-3 md:items-center">
        <input
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          placeholder="Cari nama, kode, atau lokasi aset..."
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={filterCategoryId}
          onChange={(e) => dispatch(setFilterCategoryId(e.target.value))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={filterCondition}
          onChange={(e) => dispatch(setFilterCondition(e.target.value))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Semua Kondisi</option>
          <option value="Baik">Baik</option>
          <option value="Rusak Ringan">Rusak Ringan</option>
          <option value="Rusak Berat">Rusak Berat</option>
        </select>
        {(searchTerm || filterCategoryId || filterCondition) && (
          <button
            onClick={() => dispatch(resetFilters())}
            className="text-sm text-slate-500 hover:text-slate-700 underline"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* ------------------------- TABEL ASET ------------------------- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Kode</th>
                <th className="px-4 py-3 font-medium">Nama Aset</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 font-medium">Jumlah</th>
                <th className="px-4 py-3 font-medium">Kondisi</th>
                <th className="px-4 py-3 font-medium">Lokasi</th>
                <th className="px-4 py-3 font-medium">Harga Satuan</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assetsStatus === "loading" && (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-slate-400">
                    Memuat data aset...
                  </td>
                </tr>
              )}

              {assetsStatus !== "loading" && assets.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-slate-400">
                    Tidak ditemukan aset yang sesuai dengan kriteria pencarian atau filter.
                  </td>
                </tr>
              )}

              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{asset.code}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{asset.name}</p>
                    <p className="text-xs text-slate-400">{formatTanggal(asset.purchaseDate)}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{asset.category?.name ?? "-"}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {asset.quantity} {asset.unit}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${CONDITION_BADGE[asset.condition] ?? "bg-slate-100 text-slate-600"}`}
                    >
                      {asset.condition}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{asset.location || "-"}</td>
                  <td className="px-4 py-3 text-slate-600">{formatRupiah(asset.price)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(asset)}
                        className="text-indigo-600 hover:underline text-xs font-medium"
                      >
                        Ubah
                      </button>
                      <button
                        onClick={() => setDeleteTarget(asset)}
                        className="text-red-600 hover:underline text-xs font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {assets.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 text-sm text-slate-500 flex justify-between">
            <span>{assets.length} aset ditemukan</span>
            <span>
              Total nilai: <strong className="text-slate-700">{formatRupiah(totalDisplayedValue)}</strong>
            </span>
          </div>
        )}
      </div>

      {/* ------------------------- MODAL FORM TAMBAH/UBAH ------------------------- */}
      {/* `key` dibuat unik per-aset (atau "new" untuk tambah baru) supaya React
          me-mount ulang komponen form setiap kali target edit berganti,
          sehingga isi form otomatis ter-reset tanpa perlu useEffect tambahan. */}
      {modalOpen && (
        <AssetFormModal
          key={editingAsset?.id ?? "new"}
          open={modalOpen}
          categories={categories}
          initialData={editingAsset}
          onClose={() => setModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* ------------------------- DIALOG KONFIRMASI HAPUS ------------------------- */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Konfirmasi Hapus Aset"
        message={`Anda akan menghapus aset "${deleteTarget?.name}" secara permanen. Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
