// React diperlukan karena file ini membuat sebuah komponen React.
import React from "react";
// useSelector membaca state Redux dan useDispatch digunakan untuk mengirim action.
import { useDispatch, useSelector } from "react-redux";
// Dua action ini digunakan untuk mengubah status selesai dan menghapus todo.
import { toggleTodoAction, deleteTodoAction } from "./redux";

// TodoList adalah komponen yang bertugas menampilkan seluruh data todo.
const TodoList = () => {
  // Data todos diambil langsung dari state yang tersimpan di Redux store.
  const todos = useSelector(state => state.todos);
  // dispatch disiapkan agar komponen bisa mengirim perintah ke reducer.
  const dispatch = useDispatch();
  // Fungsi ini mengirim id todo yang ingin diubah status complete-nya.
  const toggleTodo = todoID => dispatch(toggleTodoAction(todoID));
  // Fungsi ini mengirim id todo yang ingin dihapus dari daftar.
  const deleteTodo = todoID => dispatch(deleteTodoAction(todoID));

  // map mengubah setiap objek todo menjadi elemen list yang bisa ditampilkan.
  const renderTodos = todos.map(({ id, name, complete }) => (
    // key memakai id agar React dapat mengenali setiap item dengan tepat.
    <li key={id}>
      {/* Checkbox menunjukkan apakah sebuah todo sudah selesai atau belum. */}
      <input type="checkbox" checked={complete} onChange={toggleTodo.bind(null, id)} />
      {/* Jika complete bernilai true, class complete akan memberi efek coret pada teks. */}
      <span className={complete ? "complete" : null}>{name}</span>
      {/* Tombol X menjalankan fungsi deleteTodo dengan id item yang dipilih. */}
      <span className="delete-btn" onClick={deleteTodo.bind(null, id)}>X</span>
    </li>
  ));

  // Bagian ini mengembalikan tampilan daftar todo.
  return (
    // Fragment dipakai agar beberapa elemen dapat dikembalikan tanpa div tambahan.
    <>
      {/* Judul untuk bagian daftar todo. */}
      <h4>Todo List</h4>
      {/* Jika ada todo, tampilkan hasil map. Kalau belum ada, tampilkan pesan kosong. */}
      <ul>{renderTodos.length > 0 ? renderTodos : "No todo list yet"}</ul>
    </>
  );
};

// TodoList diekspor supaya dapat digunakan oleh komponen App.
export default TodoList;
