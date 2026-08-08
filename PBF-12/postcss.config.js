// PostCSS memproses CSS sebelum dipakai oleh browser.
module.exports = {
  // Plugin Tailwind dan Autoprefixer dijalankan pada proses build CSS.
  plugins: {
    // Tailwind membaca directive @tailwind yang ada di globals.css.
    tailwindcss: {},
    // Autoprefixer membantu menambahkan prefix CSS untuk kompatibilitas browser.
    autoprefixer: {},
  },
}
