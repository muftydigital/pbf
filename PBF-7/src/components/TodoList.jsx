// List menjadi pembungkus seluruh item todo.
import List from '@mui/material/List';
// ListItem mengatur satu baris todo beserta tombol aksinya.
import ListItem from '@mui/material/ListItem';
// ListItemButton membuat bagian isi todo dapat diklik.
import ListItemButton from '@mui/material/ListItemButton';
// ListItemText menampilkan teks todo dengan gaya Material UI.
import ListItemText from '@mui/material/ListItemText';
// Checkbox digunakan untuk memberi tanda pada todo.
import Checkbox from '@mui/material/Checkbox';
// IconButton membuat ikon hapus dapat berfungsi sebagai tombol.
import IconButton from '@mui/material/IconButton';
// DeleteOutlinedIcon menampilkan gambar tempat sampah.
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

// TodoList menerima daftar todo dan fungsi hapus melalui props.
export default function TodoList({ todos, deleteTodo }) {
  // Tampilkan pesan sederhana saat daftar todo masih kosong.
  if (todos.length === 0) {
    return <p>Belum ada todo.</p>;
  }

  // Ubah setiap data todo menjadi satu item Material UI.
  return (
    <List className="todo-list">
      {/* map digunakan untuk menampilkan seluruh isi array todos. */}
      {todos.map((todo) => (
        // Gunakan id sebagai key agar setiap item dikenali dengan benar oleh React.
        <ListItem
          key={todo.id}
          disablePadding
          secondaryAction={(
            // Tombol ini menghapus todo sesuai id yang dipilih.
            <IconButton
              edge="end"
              aria-label={`Hapus ${todo.text}`}
              onClick={() => deleteTodo(todo.id)}
            >
              {/* Warna error membuat ikon hapus terlihat merah. */}
              <DeleteOutlinedIcon color="error" />
            </IconButton>
          )}
        >
          {/* Bagian utama item todo dibuat seperti tombol daftar. */}
          <ListItemButton dense>
            {/* Checkbox dapat digunakan untuk memberi tanda secara visual. */}
            <Checkbox tabIndex={-1} disableRipple />
            {/* Tampilkan isi teks dari data todo. */}
            <ListItemText primary={todo.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
