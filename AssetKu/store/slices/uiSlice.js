// store/slices/uiSlice.js
// ----------------------------------------------------------------------
// Redux slice untuk mengelola state UI global yang dipakai lintas
// komponen, seperti kata kunci pencarian, filter aktif, dan notifikasi
// toast (pesan sukses/error yang muncul sementara di layar).
// Ini murni state sinkron (tidak ada pemanggilan API), makanya cukup
// pakai "reducers" biasa tanpa createAsyncThunk.
// ----------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    searchTerm: "", // kata kunci pencarian aset
    filterCategoryId: "", // filter berdasarkan kategori (kosong = semua)
    filterCondition: "", // filter berdasarkan kondisi (kosong = semua)
    toast: null, // { type: 'success' | 'error', message: string } | null
  },
  reducers: {
    // action.payload berisi string kata kunci pencarian baru
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setFilterCategoryId(state, action) {
      state.filterCategoryId = action.payload;
    },
    setFilterCondition(state, action) {
      state.filterCondition = action.payload;
    },
    // Menampilkan notifikasi toast baru, contoh payload: { type: "success", message: "Berhasil!" }
    showToast(state, action) {
      state.toast = action.payload;
    },
    // Menyembunyikan/menghapus toast yang sedang tampil
    clearToast(state) {
      state.toast = null;
    },
    // Mengosongkan semua filter sekaligus (dipakai tombol "Reset Filter")
    resetFilters(state) {
      state.searchTerm = "";
      state.filterCategoryId = "";
      state.filterCondition = "";
    },
  },
});

export const {
  setSearchTerm,
  setFilterCategoryId,
  setFilterCondition,
  showToast,
  clearToast,
  resetFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
