// Pakai style dari App.css.
import './App.css'
// Import React karena class component memakai React.Component.
import React from 'react';

// AppClass adalah komponen utama yang dibuat dalam bentuk class.
export default class AppClass extends React.Component {
  // Method render dipakai untuk menentukan tampilan komponen.
  render() {
    // Kembalikan JSX yang ingin ditampilkan.
    return (
      // main menjadi pembungkus utama.
      <main>
        {/* Judul materi JSX. */}
        <h2>Belajar menggunakan JSX pada React</h2>
        {/* Panggil komponen Header supaya ikut tampil. */}
        <Header />
      </main>
    )
  }
}

// Header juga dibuat sebagai class component.
class Header extends React.Component {
  // render berisi tampilan dari Header.
  render() {
    // Kembalikan JSX untuk judul, keterangan, dan pesan.
    return (
      // Semua isi Header dibungkus dalam satu div.
      <div>
        {/* Judul tutorial React. */}
        <h1>Tutorial Reactjs untuk Pemula</h1>
        {/* Keterangan singkat tutorial. */}
        <h2>Panduan step-by-step belajar Reactjs</h2>
        {/* Penanda bahwa contoh ini memakai class component. */}
        <p>Membuat komponen dengan class</p>
        {/* Kirim nama pengirim dan isi pesan ke Message lewat props. */}
        <Message sender="dian" content="Hi, Apa kabar?" />
      </div>
    );
  }
}

// Message dipakai untuk menampilkan data pesan yang diterima dari Header.
class Message extends React.Component {
  // render berisi tampilan pesannya.
  render() {
    // Kembalikan JSX dengan data dari props.
    return (
      // Bungkus bagian pesan dengan div.
      <div>
        {/* Pada class component, props diakses lewat this.props. */}
        <small>{this.props.sender}:</small>
        {/* Tampilkan isi pesan dari content. */}
        <p>{this.props.content}</p>
        {/* Garis pembatas setelah pesan. */}
        <hr />
      </div>
    );
  }
}
