// Typography dipakai untuk membuat judul dengan gaya dari Material UI.
import Typography from '@mui/material/Typography';
// TodoForm menjadi tempat pengguna mengetik todo baru.
import TodoForm from './components/TodoForm';
// TodoList menampilkan seluruh todo yang sudah disimpan.
import TodoList from './components/TodoList';
// Custom hook ini mengatur data todo dan fungsi untuk mengubahnya.
import useTodoState from './hooks/useTodoState';
// Ambil CSS utama untuk mengatur posisi aplikasi.
import './App.css';

// App menjadi komponen utama pada praktikum Todo List.
export default function App() {
  // Ambil daftar todo, fungsi tambah, dan fungsi hapus dari custom hook.
  const { todos, addTodo, deleteTodo } = useTodoState([]);

  // Tampilkan judul, formulir, dan daftar todo di dalam satu halaman.
  return (
    <main className="App">
      {/* Typography memberikan bentuk heading berukuran h2. */}
      <Typography component="h1" variant="h2">
        Todos
      </Typography>

      {/* TodoForm menerima fungsi untuk menyimpan teks yang diketik. */}
      <TodoForm
        saveTodo={(todoText) => {
          // Hapus spasi yang tidak diperlukan di awal dan akhir teks.
          const trimmedText = todoText.trim();

          // Todo hanya ditambahkan kalau teksnya tidak kosong.
          if (trimmedText.length > 0) {
            // Kirim teks yang sudah dirapikan ke fungsi addTodo.
            addTodo(trimmedText);
          }
        }}
      />

      {/* Kirim data todo dan fungsi hapus ke komponen daftar. */}
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </main>
  );
}
