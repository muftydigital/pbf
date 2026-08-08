// useState digunakan untuk menyimpan seluruh data todo.
import { useState } from 'react';

// Custom hook ini menerima daftar awal sebagai parameter.
export default function useTodoState(initialValue) {
  // todos berisi daftar data, sedangkan setTodos memperbaruinya.
  const [todos, setTodos] = useState(initialValue);

  // Fungsi ini menambahkan todo baru berdasarkan teks yang diterima.
  const addTodo = (todoText) => {
    // Gunakan updater agar penambahan selalu memakai data terbaru.
    setTodos((currentTodos) => [
      // Pertahankan seluruh todo yang sudah ada.
      ...currentTodos,
      // Tambahkan objek baru dengan id unik dan teks dari pengguna.
      {
        id: crypto.randomUUID(),
        text: todoText,
      },
    ]);
  };

  // Fungsi ini menghapus satu todo berdasarkan id.
  const deleteTodo = (todoId) => {
    // filter menyisakan semua item yang id-nya tidak sama.
    setTodos((currentTodos) => (
      currentTodos.filter((todo) => todo.id !== todoId)
    ));
  };

  // Kembalikan data dan dua fungsi agar dapat digunakan App.
  return {
    todos,
    addTodo,
    deleteTodo,
  };
}
