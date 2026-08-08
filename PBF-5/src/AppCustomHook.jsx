// Ambil aturan tampilan utama aplikasi.
import './App.css';
// UserForm berisi contoh penggunaan custom hook pada sebuah formulir.
import UserForm from './components/UserForm';

// Komponen utama untuk materi React Custom Hook.
export default function AppCustomHook() {
  // Tampilkan judul dan formulir pengguna di dalam elemen main.
  return (
    <main>
      {/* Judul materi yang sedang dipraktikkan. */}
      <h1>Belajar React Custom Hook</h1>

      {/* Panggil komponen formulir yang memakai hook useInput. */}
      <UserForm />
    </main>
  );
}
