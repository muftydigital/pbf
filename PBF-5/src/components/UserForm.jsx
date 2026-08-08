// useState dari React dipakai untuk menyimpan tulisan sapaan.
import { useState } from 'react';
// Ambil custom hook yang mengatur nilai input dan fungsi reset.
import useInput from '../hooks/useInput';

// Komponen ini menampilkan formulir nama depan dan nama belakang.
export default function UserForm() {
  // Ambil nilai, atribut input, dan fungsi reset untuk nama depan.
  const [firstName, bindFirstName, resetFirstName] = useInput('Hendra');
  // Buat pengaturan yang sama untuk bagian nama belakang.
  const [lastName, bindLastName, resetLastName] = useInput('Permana');
  // State title dipakai untuk menampilkan hasil setelah form dikirim.
  const [title, setTitle] = useState('');

  // Fungsi ini menangani proses ketika pengguna mengirim formulir.
  const submitHandler = (event) => {
    // Cegah browser memuat ulang halaman secara otomatis.
    event.preventDefault();

    // Gabungkan nama depan dan belakang menjadi kalimat sapaan.
    setTitle(`Hello ${firstName} ${lastName}`);
    // Kembalikan nama depan ke nilai awal.
    resetFirstName();
    // Kembalikan nama belakang ke nilai awal.
    resetLastName();
  };

  // Fragment dipakai karena ada judul dan form tanpa pembungkus tambahan.
  return (
    <>
      {/* Sapaan akan terlihat setelah tombol Submit ditekan. */}
      <h3>{title}</h3>

      {/* Jalankan submitHandler saat formulir dikirim. */}
      <form onSubmit={submitHandler}>
        {/* Bagian input untuk nama depan. */}
        <div>
          {/* Keterangan untuk kolom nama depan. */}
          <label htmlFor="firstName">First Name</label>
          {/* bindFirstName memasukkan value dan onChange dari useInput. */}
          <input
            id="firstName"
            {...bindFirstName}
            type="text"
          />
        </div>

        {/* Bagian input untuk nama belakang. */}
        <div>
          {/* Keterangan untuk kolom nama belakang. */}
          <label htmlFor="lastName">Last Name</label>
          {/* bindLastName membuat input terhubung dengan state-nya. */}
          <input
            id="lastName"
            {...bindLastName}
            type="text"
          />
        </div>

        {/* Tombol submit mengirim data yang ada di dalam form. */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
