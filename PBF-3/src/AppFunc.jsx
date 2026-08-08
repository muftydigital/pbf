// Pakai style dari App.css.
import './App.css'

// AppFunc adalah komponen utama yang dibuat dengan function.
export default function AppFunc() {
  // Contoh menyimpan JSX ke dalam variabel.
  // Variabel ini belum ditampilkan karena tidak dipanggil di bagian return.
  const element = <h1>Hello, world</h1>;

  // Return berisi tampilan dari komponen AppFunc.
  return (
    // main menjadi pembungkus isi komponen.
    <main>
      {/* Judul materi yang sedang dipelajari. */}
      <h2>Belajar menggunakan JSX pada React</h2>
      {/* Panggil komponen Header supaya ikut tampil. */}
      <Header />
    </main>
  )
}

// Header dibuat sebagai function component terpisah.
function Header() {
  // Isi yang akan ditampilkan oleh Header.
  return (
    // Semua isi dibungkus dalam satu div.
    <div>
      {/* Judul tutorial. */}
      <h1>Tutorial Reactjs untuk Pemula</h1>
      {/* Penanda bahwa contoh ini memakai function component. */}
      <h2>Function Component</h2>
      {/* Kirim nama pengirim dan isi pesan ke Message lewat props. */}
      <Message sender="dian" content="Hi, Apa kabar?" />
    </div>
  );
}

// props berisi data yang dikirim dari komponen Header.
function Message(props) {
  // Tampilkan pesan sesuai data yang ada di props.
  return (
    // Bungkus semua bagian pesan dengan div.
    <div>
      {/* Ambil nama pengirim dari props.sender. */}
      <small>{props.sender}:</small>
      {/* Ambil isi pesan dari props.content. */}
      <p>{props.content}</p>
      {/* Garis pembatas setelah pesan. */}
      <hr />
    </div>
  );
}
