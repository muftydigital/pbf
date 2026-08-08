// TextField menyediakan kolom input dengan tampilan Material UI.
import TextField from '@mui/material/TextField';
// Custom hook ini mengatur nilai, perubahan, dan reset input.
import useInputState from '../hooks/useInputState';

// TodoForm menerima saveTodo dari komponen App melalui props.
export default function TodoForm({ saveTodo }) {
  // Ambil kebutuhan input dari custom hook useInputState.
  const { value, reset, onChange } = useInputState();

  // Fungsi ini dijalankan ketika formulir dikirim.
  const handleSubmit = (event) => {
    // Cegah browser memuat ulang halaman secara otomatis.
    event.preventDefault();
    // Kirim isi input ke fungsi saveTodo milik komponen App.
    saveTodo(value);
    // Kosongkan kembali kolom setelah todo disimpan.
    reset();
  };

  // Tampilkan satu formulir dengan kolom untuk menulis todo.
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {/* TextField terhubung langsung dengan state dari useInputState. */}
      <TextField
        variant="outlined"
        label="Todo baru"
        placeholder="Tambahkan todo"
        margin="normal"
        onChange={onChange}
        value={value}
        fullWidth
      />
    </form>
  );
}
