// Membuat class Holiday sebagai cetakan untuk membuat data perjalanan
class Holiday {
  // Constructor dijalankan saat object baru dari class Holiday dibuat
  constructor(destination, days) {
    // Menyimpan nilai destination ke property destination milik object
    this.destination = destination;

    // Menyimpan jumlah hari ke property days milik object
    this.days = days;
  }

  // Membuat method info untuk menampilkan informasi perjalanan
  info() {
    // Menampilkan tujuan dan lama perjalanan melalui alert
    alert(this.destination + " will take " + this.days + " days.");
  }
}

// Membuat object trip dari class Holiday dengan tujuan Semeru selama 10 hari
var trip = new Holiday("Semeru", 10);

// Menjalankan method info dari object trip
trip.info();
