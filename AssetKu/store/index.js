// store/index.js
// ----------------------------------------------------------------------
// Titik pusat (root) konfigurasi Redux Store.
// configureStore dari Redux Toolkit otomatis menggabungkan reducer,
// memasang Redux DevTools, dan menambahkan middleware default
// (termasuk thunk middleware yang dibutuhkan createAsyncThunk).
// ----------------------------------------------------------------------

import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "./slices/assetsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import uiReducer from "./slices/uiSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      assets: assetsReducer, // state.assets -> { items, status, error }
      categories: categoriesReducer, // state.categories -> { items, status, error }
      ui: uiReducer, // state.ui -> { searchTerm, filterCategoryId, filterCondition, toast }
    },
  });

// Instance store utama yang dipakai oleh <Provider> di pages/_app.js
export const store = makeStore();
