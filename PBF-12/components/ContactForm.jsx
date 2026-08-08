// useForm membantu saya mengatur input, validasi, dan proses submit tanpa membuat state untuk setiap input.
import { useForm } from 'react-hook-form'

// Komponen ini dipakai ulang di halaman tambah dan edit supaya form tidak ditulis dua kali.
export default function ContactForm({ defaultValues = {}, onSubmit, submitText = 'Simpan' }) {
  // register menghubungkan input ke React Hook Form, handleSubmit menjalankan validasi, dan errors menyimpan pesan kesalahan.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues })

  // Form ini akan memanggil fungsi onSubmit dari halaman pemanggil setelah seluruh validasi berhasil.
  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      {/* Input nama wajib diisi dan minimal dua karakter. */}
      <label htmlFor="name">Nama</label>
      <input
        id="name"
        type="text"
        placeholder="Contoh: Budi Santoso"
        {...register('name', {
          required: 'Nama wajib diisi',
          minLength: { value: 2, message: 'Nama minimal 2 karakter' },
        })}
      />
      {/* Pesan ini hanya muncul kalau input nama tidak lolos validasi. */}
      {errors.name && <p className="error-text">{errors.name.message}</p>}

      {/* Type email membantu browser mengenali bahwa nilai yang dimasukkan harus berupa alamat email. */}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="nama@email.com"
        {...register('email', {
          required: 'Email wajib diisi',
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Format email belum benar' },
        })}
      />
      {/* Error email ditampilkan jika kolom kosong atau formatnya tidak sesuai. */}
      {errors.email && <p className="error-text">{errors.email.message}</p>}

      {/* Nomor telepon saya simpan sebagai teks agar angka nol di bagian depan tidak hilang. */}
      <label htmlFor="phone">Nomor Telepon</label>
      <input
        id="phone"
        type="tel"
        placeholder="08xxxxxxxxxx"
        {...register('phone', {
          required: 'Nomor telepon wajib diisi',
          minLength: { value: 8, message: 'Nomor telepon minimal 8 karakter' },
        })}
      />
      {/* Pesan validasi telepon hanya tampil jika aturan di atas tidak terpenuhi. */}
      {errors.phone && <p className="error-text">{errors.phone.message}</p>}

      {/* Alamat memakai textarea karena biasanya isinya lebih panjang dari satu baris. */}
      <label htmlFor="address">Alamat</label>
      <textarea
        id="address"
        placeholder="Masukkan alamat singkat"
        {...register('address', { required: 'Alamat wajib diisi' })}
      />
      {/* Jika alamat kosong, React Hook Form menampilkan pesan berikut. */}
      {errors.address && <p className="error-text">{errors.address.message}</p>}

      {/* Tombol dibuat disabled saat submit agar pengguna tidak mengirim data berkali-kali. */}
      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Memproses...' : submitText}
      </button>
    </form>
  )
}
