// React dipanggil bersama useState karena komponen ini membutuhkan state lokal untuk isi input.
import React, { useState } from "react";
// useDispatch dipakai untuk mengirim action, sedangkan useSelector dipakai untuk membaca state Redux.
import { useDispatch, useSelector } from "react-redux";
// uuid dipakai untuk membuat id yang berbeda pada setiap todo baru.
import { v4 as uuid } from "uuid";
// Action addTodoAction diambil dari file redux agar data todo bisa ditambahkan ke store.
import { addTodoAction } from "./redux";

// TodoInput dibuat sebagai functional component.
const TodoInput = () => {
  // Saya mengambil data todos dari state Redux untuk menghitung jumlah todo yang ada.
  const todos = useSelector(state => state.todos);
  // State todo menyimpan sementara teks yang sedang diketik pengguna pada input.
  const [todo, setTodo] = useState("");
  // dispatch menjadi penghubung untuk mengirim action ke Redux store.
  const dispatch = useDispatch();
  // Fungsi ini mempermudah pemanggilan action penambahan todo.
  const addTodo = todo => dispatch(addTodoAction(todo));

  // Fungsi onChange dijalankan setiap isi input berubah.
  const onChange = e => {
    // Nilai input terbaru disimpan ke state todo.
    setTodo(e.target.value);
  };

  // Fungsi onSubmit dijalankan ketika form dikirim.
  const onSubmit = e => {
    // preventDefault dipakai supaya halaman tidak reload saat form disubmit.
    e.preventDefault();
    // Jika input hanya kosong atau spasi, pengguna diberi peringatan.
    if (todo.trim() === "") alert("Please input todo");
    // Jika input berisi teks, program masuk ke bagian penambahan data.
    else {
      // Data todo baru dikirim ke Redux melalui fungsi addTodo.
      addTodo({
        // uuid membuat id unik supaya setiap item dapat dibedakan.
        id: uuid(),
        // name diisi dengan teks todo yang diketik pengguna.
        name: todo,
        // Todo baru diberi status belum selesai.
        complete: false
      });
    }
    // Setelah proses submit selesai, isi input dikosongkan kembali.
    setTodo("");
  };

  // Tampilan form dikembalikan melalui JSX.
  return (
    // Saat form disubmit, fungsi onSubmit di atas akan dijalankan.
    <form onSubmit={onSubmit}>
      {/* Jumlah todo dibaca dari panjang array todos yang berasal dari Redux. */}
      <h3>You have {todos.length} todos</h3>
      {/* Input ini dikontrol oleh state todo dan berubah melalui fungsi onChange. */}
      <input type="text" placeholder="add todo" value={todo} onChange={onChange} />
      {/* Tombol bertipe submit digunakan untuk menambahkan todo ke daftar. */}
      <button type="submit">Add Todo</button>
    </form>
  );
};

// Komponen TodoInput diekspor agar bisa dipakai di App.jsx.
export default TodoInput;
