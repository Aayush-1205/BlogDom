import Aos from "@/Components/Aos";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import ScrollTop from "@/Components/ScrollTop";
import TopLoadingLine from "@/Components/TopLoadingLine";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        <TopLoadingLine />
        <Aos>
          <Component {...pageProps} />
        </Aos>
        <ScrollTop />
      </main>
      <Footer />
    </>
  );
}
