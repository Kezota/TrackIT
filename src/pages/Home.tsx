import { Header } from "@/components/Header";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <>
      <NavBar currentNav="home" />
      <Header />
    </>
  );
}
//        <FlipWords words={["Track Effortlessly", "Simple, Fast, Reliable"]} />

export default Home;
