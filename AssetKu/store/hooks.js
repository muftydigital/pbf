// store/hooks.js
// ----------------------------------------------------------------------
// Custom React Hooks tipis pembungkus (wrapper) dari react-redux.
// Dibuat supaya seluruh komponen memakai satu titik import yang sama
// ("@/store/hooks") daripada langsung mengimport dari "react-redux" di
// setiap file. Ini juga tempat yang tepat untuk menambah logic tambahan
// di masa depan tanpa mengubah banyak file.
// ----------------------------------------------------------------------

import { useDispatch, useSelector } from "react-redux";

// useAppDispatch -> dipakai untuk men-dispatch action/thunk ke store
export const useAppDispatch = () => useDispatch();

// useAppSelector -> dipakai untuk membaca sepotong state dari store
// Contoh: const assets = useAppSelector((state) => state.assets.items);
export const useAppSelector = useSelector;
