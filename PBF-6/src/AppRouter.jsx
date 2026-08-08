// Komponen berikut digunakan untuk membuat navigasi tanpa memuat ulang halaman.
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

// AppRouter menjadi komponen utama untuk latihan React Router.
export default function AppRouter() {
  // BrowserRouter membungkus semua menu dan daftar rute aplikasi.
  return (
    <BrowserRouter>
      <div>
        {/* Navigasi utama menuju setiap halaman. */}
        <nav>
          {/* Daftar menu dibuat menggunakan elemen list. */}
          <ul>
            <li>
              {/* Link berpindah ke halaman Beranda tanpa refresh browser. */}
              <Link to="/">Beranda</Link>
            </li>
            <li>
              {/* Link ini membuka halaman Berita. */}
              <Link to="/berita">Berita</Link>
            </li>
            <li>
              {/* Link ini membuka halaman Tentang. */}
              <Link to="/tentang">Tentang</Link>
            </li>
            <li>
              {/* Tanda bintang membuat Profile dapat memiliki rute turunan. */}
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        {/* Switch memilih Route pertama yang cocok dengan alamat saat ini. */}
        <Switch>
          {/* Alamat utama menampilkan komponen Beranda. */}
          <Route exact path="/">
            <Beranda />
          </Route>
          {/* Alamat /berita menampilkan komponen Berita. */}
          <Route path="/berita">
            <Berita />
          </Route>
          {/* Alamat /tentang menampilkan identitas mahasiswa. */}
          <Route path="/tentang">
            <Tentang />
          </Route>
          {/* Semua alamat yang diawali /profile ditangani oleh Profile. */}
          <Route path="/profile">
            <Profile />
          </Route>
          {/* Alamat yang tidak tersedia akan menampilkan halaman tidak ditemukan. */}
          <Route>
            <TidakDitemukan />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

// Komponen sederhana untuk halaman awal.
function Beranda() {
  // Tampilkan judul halaman Beranda.
  return <h2>Beranda</h2>;
}

// Komponen sederhana untuk halaman berita.
function Berita() {
  // Tampilkan judul halaman Berita.
  return <h2>Berita</h2>;
}

// Komponen Tentang menampilkan identitas untuk praktikum.
function Tentang() {
  // Gunakan div karena ada beberapa elemen yang ditampilkan bersama.
  return (
    <div>
      {/* Judul halaman identitas. */}
      <h2>Tentang</h2>
      {/* Nomor induk mahasiswa. */}
      <h3>NIM: 310700012410009</h3>
      {/* Nama mahasiswa yang mengerjakan praktikum. */}
      <h3>Nama: Ali Mufty Ramdhani</h3>
    </div>
  );
}

// Profile mempunyai navigasi dan rute turunannya sendiri.
function Profile() {
  // Tampilkan pilihan CV dan Contacts beserta isi rutenya.
  return (
    <div>
      {/* Navigasi khusus di dalam halaman Profile. */}
      <nav>
        {/* Link ini membuka bagian CV di dalam halaman Profile. */}
        <Link to="/profile/cv">CV</Link>
        {/* Pindahkan link berikutnya ke baris baru. */}
        <br />
        {/* Link ini membuka bagian kontak di dalam halaman Profile. */}
        <Link to="/profile/contact">Contacts</Link>
      </nav>

      {/* Switch berikut memilih isi yang ditampilkan di halaman Profile. */}
      <Switch>
        {/* Saat /profile dibuka, tampilkan CV sebagai halaman awal. */}
        <Route exact path="/profile">
          <CV />
        </Route>
        {/* Rute /profile/cv juga menampilkan komponen CV. */}
        <Route path="/profile/cv">
          <CV />
        </Route>
        {/* Rute contact sudah disamakan dengan alamat pada Link. */}
        <Route path="/profile/contact">
          <Contact />
        </Route>
      </Switch>
    </div>
  );
}

// Komponen CV berisi informasi dasar pengguna.
function CV() {
  // Data yang belum diberikan tidak diisi dengan informasi buatan.
  return (
    <div>
      {/* Nama lengkap mahasiswa. */}
      <h3>Nama Lengkap: Ali Mufty Ramdhani</h3>
      {/* Data tanggal lahir belum dicantumkan. */}
      <h3>Tanggal Lahir: Belum dicantumkan</h3>
      {/* Data pendidikan terakhir belum dicantumkan. */}
      <h3>Pendidikan Terakhir: Belum dicantumkan</h3>
    </div>
  );
}

// Komponen Contact menyediakan tempat untuk informasi kontak.
function Contact() {
  // Tampilkan tiga jenis kontak yang ada pada contoh praktikum.
  return (
    <div>
      {/* Alamat email belum dicantumkan. */}
      <h3>Email: Belum dicantumkan</h3>
      {/* Akun Twitter belum dicantumkan. */}
      <h3>Twitter: Belum dicantumkan</h3>
      {/* Akun Instagram belum dicantumkan. */}
      <h3>Instagram: Belum dicantumkan</h3>
    </div>
  );
}

// Komponen ini digunakan jika pengguna membuka alamat yang tidak tersedia.
function TidakDitemukan() {
  // Beri keterangan singkat bahwa halaman tidak ditemukan.
  return <h2>Halaman tidak ditemukan</h2>;
}
