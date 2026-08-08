// File CSS ini dipanggil supaya tampilan komponen App mengikuti style yang sudah dibuat.
import './App.css'
// Komponen TodoInput dipakai untuk bagian form penambahan todo.
import TodoInput from "./TodoInput";
// Komponen TodoList dipakai untuk menampilkan daftar todo yang tersimpan di Redux.
import TodoList from "./TodoList";

// App adalah komponen utama yang menyatukan input dan daftar todo.
export default function App() {
  // Bagian return menentukan tampilan yang akan muncul di halaman.
  return (
    // Div ini menjadi pembungkus utama aplikasi dan memakai class App dari CSS.
    <div className="App">
      {/* Judul sederhana untuk menunjukkan bahwa contoh ini memakai React, Redux, dan Hooks. */}
      <h1>react-redux-hooks</h1>
      {/* Komponen ini menyediakan input untuk menambahkan todo baru. */}
      <TodoInput />
      {/* Komponen ini menampilkan todo yang sudah masuk ke state Redux. */}
      <TodoList />
    </div>
  )
}
