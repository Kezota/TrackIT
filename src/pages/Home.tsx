import { Header } from "@/components/Header";
import NavBar from "../components/NavBar";
import { Footer } from "@/components/Footer";

function Home() {
  return (
    <>
      <NavBar currentNav="home" />
      <Header />
      <Footer />
    </>
  );
}

export default Home;
