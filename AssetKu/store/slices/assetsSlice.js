// store/slices/assetsSlice.js
// ----------------------------------------------------------------------
// Redux slice untuk mengelola state daftar ASET di seluruh aplikasi.
// Menggunakan Redux Toolkit (createSlice & createAsyncThunk) supaya kode
// lebih ringkas dibanding Redux konvensional (tidak perlu menulis action
// type & switch-case reducer secara manual).
// ----------------------------------------------------------------------

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ------------------------- Async Thunks -------------------------
// Thunk adalah fungsi async yang boleh melakukan side effect (fetch API)
// sebelum akhirnya men-dispatch action biasa ke reducer.

// Mengambil daftar aset dari API, mendukung filter opsional (search,
// categoryId, condition) yang dikirim sebagai query string.
export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      if (filters.categoryId) params.set("categoryId", filters.categoryId);
      if (filters.condition) params.set("condition", filters.condition);

      const query = params.toString();
      const response = await fetch(`/api/assets${query ? `?${query}` : ""}`);
      if (!response.ok) throw new Error("Gagal mengambil data aset.");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Menambahkan aset baru ke database melalui API, lalu mengembalikan
// data aset yang baru dibuat supaya bisa langsung ditambahkan ke state.
export const createAsset = createAsyncThunk(
  "assets/createAsset",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal menambah aset.");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Mengubah data aset yang sudah ada berdasarkan ID
export const updateAsset = createAsyncThunk(
  "assets/updateAsset",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/assets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal mengubah aset.");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Menghapus aset berdasarkan ID
export const deleteAsset = createAsyncThunk(
  "assets/deleteAsset",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/assets/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal menghapus aset.");
      return id; // kembalikan id supaya reducer tahu item mana yang harus dihapus dari state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ------------------------- Slice Definition -------------------------
const assetsSlice = createSlice({
  name: "assets",
  initialState: {
    items: [], // daftar aset yang sedang ditampilkan
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  // reducers biasa (synchronous), saat ini tidak diperlukan tapi disediakan
  // sebagai tempat menambah aksi lokal di masa depan bila dibutuhkan.
  reducers: {},
  // extraReducers menangani action yang dihasilkan oleh createAsyncThunk
  // di atas (yang punya status pending/fulfilled/rejected otomatis).
  extraReducers: (builder) => {
    builder
      // --- fetchAssets ---
      .addCase(fetchAssets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // --- createAsset ---
      .addCase(createAsset.fulfilled, (state, action) => {
        // Tambahkan aset baru ke posisi paling atas daftar
        state.items.unshift(action.payload);
      })
      // --- updateAsset ---
      .addCase(updateAsset.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // --- deleteAsset ---
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default assetsSlice.reducer;
