// Mengimpor file CSS yang digunakan untuk mengatur tampilan komponen App
import './App.css';

// Membuat function component bernama App sebagai komponen utama aplikasi
function App() {
  // Return digunakan untuk menentukan tampilan yang akan ditampilkan oleh komponen
  return (
    // Div menjadi pembungkus utama isi komponen
    <div className="App">
      {/* Menampilkan teks Hello, world! seperti contoh pada materi praktikum */}
      <h1>Hello, world!</h1>
    </div>
  );
}

// Mengekspor komponen App supaya bisa digunakan pada file lain, yaitu index.js
export default App;
