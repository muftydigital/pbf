// store/slices/categoriesSlice.js
// ----------------------------------------------------------------------
// Redux slice untuk mengelola state daftar KATEGORI barang.
// Pola yang dipakai sama persis dengan assetsSlice.js supaya konsisten
// dan mudah dipahami.
// ----------------------------------------------------------------------

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mengambil semua kategori dari API
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Gagal mengambil data kategori.");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Menambah kategori baru
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal menambah kategori.");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Mengubah kategori
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal mengubah kategori.");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Menghapus kategori
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal menghapus kategori.");
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push({ ...action.payload, _count: { assets: 0 } });
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;
