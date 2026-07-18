// Membuat fungsi greeting menggunakan bentuk arrow function dengan satu parameter bernama message
var greeting = message => {
  // Menampilkan isi parameter message dalam bentuk alert
  alert(message);
}

// Memanggil fungsi greeting dan mengirim teks Selamat Pagi sebagai nilai message
greeting('Selamat Pagi');

// Membuat arrow function lain yang menerima dua parameter
var greetingNew = (message1, message2) => {
  // Menggabungkan isi kedua parameter lalu menampilkannya melalui alert
  alert(message1 + " " + message2);
}
