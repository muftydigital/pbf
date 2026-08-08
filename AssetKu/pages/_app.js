// pages/_app.js
// ----------------------------------------------------------------------
// Komponen root Next.js yang membungkus SEMUA halaman di aplikasi ini.
// Di sinilah tempat yang tepat untuk memasang Provider global, seperti
// Redux <Provider> agar seluruh halaman & komponen bisa mengakses store.
// ----------------------------------------------------------------------

import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    // <Provider> dari react-redux membuat `store` tersedia untuk
    // semua komponen di bawahnya lewat React Context, sehingga
    // setiap komponen bisa memakai useAppSelector/useAppDispatch
    // tanpa perlu passing props secara manual (prop-drilling).
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
