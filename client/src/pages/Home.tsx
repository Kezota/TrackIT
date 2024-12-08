import { Header } from "@/components/Header";
import NavBar from "../components/NavBar";
import { Footer } from "@/components/Footer";

function Home() {
  return (
    <section className="page">
      <NavBar currentNav="home" />
      <Header />
      <Footer />
    </section>
  );
}

export default Home;
