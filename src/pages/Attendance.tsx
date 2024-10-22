import { Footer } from "@/components/Footer";
import NavBar from "../components/NavBar";

function Attendance() {
  return (
    <>
      <NavBar currentNav="attendance" />
      <h1 className="text-3xl font-bold underline">Attendance</h1>
      <Footer />
    </>
  );
}

export default Attendance;
