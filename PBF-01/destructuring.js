// Contoh penggunaan destructuring pada sebuah object

// Membuat object book yang menyimpan informasi sebuah buku
const book = {
  // Property title berisi judul buku
  "title": "Manusia Setengah Salmon",

  // Property author berisi nama penulis
  "author": "Raditya Dika",

  // Property publisher berupa object lagi karena mempunyai data nama dan alamat
  "publisher": {
    // Nama penerbit
    "name": "Gagas Media",

    // Alamat penerbit
    "address": "Jakarta Selatan"
  }
}

// Mengambil beberapa nilai dari object book dengan destructuring
// title diganti nama variabelnya menjadi bookTitle
// author diberi nilai default "RD" kalau datanya tidak tersedia
// name dan address diambil dari object publisher yang ada di dalam book
const {title: bookTitle, author = "RD", publisher:{name, address}} = book;

// Menampilkan hasil destructuring ke console browser
console.log(bookTitle, author, name, address);
