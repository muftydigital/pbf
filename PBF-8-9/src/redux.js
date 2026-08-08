// createStore digunakan untuk membuat penyimpanan state Redux.
import { createStore } from "redux";

// initialState adalah kondisi awal data ketika aplikasi pertama kali dijalankan.
const initialState = {
  // Pada awal aplikasi, daftar todos masih berupa array kosong.
  todos: []
};

// Reducer menerima state saat ini serta action yang berisi type dan payload.
const reducers = (state, { type, payload }) => {
  // switch memilih proses yang dijalankan berdasarkan type action.
  switch (type) {
    // Case ini dijalankan ketika pengguna menambahkan todo baru.
    case "ADD_TODO":
      // Reducer mengembalikan object state yang baru.
      return {
        // State lama tetap dipertahankan dengan spread operator.
        ...state,
        // Todo baru ditambahkan di bagian akhir array todos.
        todos: [...state.todos, payload]
      };

    // Case ini dijalankan ketika checkbox sebuah todo ditekan.
    case "TOGGLE_TODO":
      // State baru dikembalikan tanpa mengubah state lama secara langsung.
      return {
        // Isi state sebelumnya tetap disalin.
        ...state,
        // map digunakan untuk memeriksa setiap item todo.
        todos: state.todos.map(todo =>
          // Jika id sesuai payload, nilai complete dibalik. Item lain dibiarkan tetap sama.
          todo.id === payload ? { ...todo, complete: !todo.complete } : todo
        )
      };

    // Case ini dijalankan ketika pengguna menekan tombol hapus.
    case "DELETE_TODO":
      // Reducer kembali menghasilkan object state baru.
      return {
        // State sebelumnya tetap disalin terlebih dahulu.
        ...state,
        // filter menyisakan todo yang id-nya tidak sama dengan id yang dihapus.
        todos: state.todos.filter(todo => todo.id !== payload)
      };

    // default dipakai jika type action tidak cocok dengan case yang tersedia.
    default:
      // Jika tidak ada action yang dikenali, state dikembalikan tanpa perubahan.
      return state;
  }
};

// Store dibuat dari reducer, initialState, dan dukungan Redux DevTools jika tersedia di browser.
export const store = createStore(
  // reducers menjadi fungsi utama yang mengatur perubahan state.
  reducers,
  // initialState menjadi nilai awal store.
  initialState,
  // Baris ini mengaktifkan Redux DevTools pada browser jika extension tersebut tersedia.
  window.devToolsExtension && window.devToolsExtension()
);

// Bagian berikut berisi action creator untuk menambah todo.
export const addTodoAction = todo => ({
  // Type ADD_TODO akan dibaca oleh reducer pada case penambahan todo.
  type: "ADD_TODO",
  // Payload membawa object todo baru yang akan dimasukkan ke state.
  payload: todo
});

// Action creator ini dipakai untuk mengubah status selesai sebuah todo.
export const toggleTodoAction = todoID => ({
  // Type TOGGLE_TODO mengarahkan reducer ke proses perubahan complete.
  type: "TOGGLE_TODO",
  // Payload berisi id todo yang dipilih.
  payload: todoID
});

// Action creator ini dipakai untuk menghapus todo tertentu.
export const deleteTodoAction = todoID => ({
  // Type DELETE_TODO mengarahkan reducer ke proses penghapusan.
  type: "DELETE_TODO",
  // Payload membawa id todo yang akan dihapus.
  payload: todoID
});
