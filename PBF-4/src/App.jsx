// Pakai style yang ada di App.css.
import './App.css'
// Import generator nama beserta kumpulan kata yang akan dipakai.
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

// App adalah komponen utama dari program ini.
export default function App() {
  // Return berisi bagian yang akan tampil di halaman.
  return (
    // main menjadi pembungkus utama.
    <main>
      {/* Judul halaman praktikum. */}
      <h3>Belajar React</h3>
      {/* Hilangkan tanda komentar untuk mencoba contoh event. */}
      {/*<EventExample />*/}
      {/* Hilangkan tanda komentar untuk mencoba generator nama. */}
      {/*<GenerateRandomName />*/}
      {/* Nilai isLoading bisa diganti true atau false untuk mencoba kondisi yang berbeda. */}
      {/*<ConditionalExample isLoading={false} />*/}
      {/* Contoh yang sedang ditampilkan adalah list dan key. */}
      {<ListKeyExample />}
    </main>
  )
}

// Komponen ini menampilkan beberapa data produk dalam bentuk list.
function ListKeyExample() {
  // Data HP disimpan dalam array agar bisa ditampilkan berulang dengan map.
  const phoneData = [
    // Produk pertama memiliki diskon 50 persen.
    { name: "iPhone X", price: 10000000, discount: 50 },
    // Produk kedua memiliki diskon 30 persen.
    { name: "Oppo Find X", price: 14000000, discount: 30 },
    // Produk ketiga memiliki diskon 42 persen.
    { name: "Redmi Note X", price: 5000000, discount: 42 },
    // Produk terakhir tidak memiliki diskon.
    { name: "Vivo XYZ", price: 10000000, discount: 0 },
  ];

  // Tampilkan semua data yang ada di phoneData.
  return (
    // div menjadi pembungkus daftar produk.
    <div>
      {/* Kurung kurawal dipakai untuk menjalankan JavaScript di dalam JSX. */}
      {
        // map mengulang setiap data produk yang ada di dalam array.
        phoneData.map(data => {
          // Setiap perulangan mengembalikan satu komponen Product.
          return (
            <Product
              // key membantu React mengenali setiap item secara unik.
              key={data.name}
              // Kirim nama produk melalui props.
              name={data.name}
              // Kirim harga produk melalui props.
              price={data.price}
              // Kirim jumlah diskon melalui props.
              discount={data.discount}
            />
          )
        })
      }
    </div>
  )
}

// Ambil name, price, dan discount langsung dari props.
// Kalau discount tidak dikirim, nilainya otomatis 0.
function Product({ name, price, discount = 0 }) {
  // Tampilkan informasi dari satu produk.
  return (
    // Semua bagian produk dibungkus dengan div.
    <div>
      {/* Tampilkan nama produknya. */}
      <h2>{name}</h2>
      {/* Harga awal hanya dicoret kalau produknya memiliki diskon. */}
      {discount > 0 && <p><s>Rp {price}</s> ({discount}%)</p>}
      {/* Paragraf ini berisi harga setelah diskon. */}
      <p>
        {/* Buat tulisan harga menjadi tebal. */}
        <b>
          {/* Hitung harga awal dikurangi jumlah diskonnya. */}
          Rp {parseInt(price) - parseInt(price) * (parseInt(discount) / 100)}
        </b>
      </p>
      {/* Beri garis pembatas antara satu produk dengan produk berikutnya. */}
      <hr />
    </div>
  );
}

// Komponen ini mencoba conditional rendering berdasarkan props isLoading.
function ConditionalExample(props) {
  // Kalau isLoading bernilai true, tampilkan halaman loading.
  if (props.isLoading) {
    return <LoadingView />
  } else {
    // Kalau false, tampilkan halaman setelah pengguna berhasil masuk.
    return <LoggedView />
  }
}

// Tampilan sederhana saat data masih dimuat.
function LoadingView() {
  return (
    <h2>Loading...</h2>
  )
}

// Tampilan yang muncul setelah proses loading selesai.
function LoggedView() {
  // Buat nama acak dari gabungan kata sifat, warna, dan nama hewan.
  const random = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
  // Tampilkan ucapan selamat datang bersama nama acak tadi.
  return <h2>Welcome {random}</h2>
}

// Komponen ini membuat nama acak ketika tombol ditekan.
function GenerateRandomName() {
  // Variabel ini akan menyimpan nama yang sudah dibuat.
  let randomName

  // Fungsi dijalankan saat tombol diklik.
  function createRandomName() {
    // Isi randomName dengan gabungan kata yang dibuat secara acak.
    randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
    // Tampilkan hasilnya melalui kotak alert.
    alert(`Random Name: ${randomName}`)
  }

  // Tombol memakai onClick untuk memanggil fungsi createRandomName.
  return (
    <button onClick={createRandomName}>Generate Random Name</button>
  )
}

// Komponen ini berisi contoh penanganan event pada input dan tombol.
function EventExample() {
  // Variabel email dipakai untuk menyimpan isi dari input.
  let email = ""

  // Fungsi ini menampilkan email saat tombol ditekan.
  function handleClick() {
    alert('Email: ' + email)
  }

  // Fungsi ini mengambil nilai terbaru setiap kali isi input berubah.
  function handleChange(event) {
    email = event.target.value;
  }

  // Tampilkan form sederhana untuk mencoba event onChange dan onClick.
  return (
    // div membungkus judul, input, dan tombol.
    <div>
      {/* Judul untuk contoh event. */}
      <h4>Menangani Event</h4>
      {/* Saat input berubah, teruskan event ke fungsi handleChange. */}
      <input onChange={(event) => {
        handleChange(event)
      }} type="email" />
      {/* Saat tombol diklik, jalankan fungsi handleClick. */}
      <button onClick={() => {
        handleClick()
      }}>Tampilkan Email</button>
    </div>
  )
}
