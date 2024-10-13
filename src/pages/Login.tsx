import ParticlesComponent from "@/components/ParticlesComponent";
import NavBar from "../components/NavBar";
import LoginCard from "@/components/LoginCard";

function Login() {
  return (
    <>
      <NavBar currentNav="login" />

      <section className="container mx-auto flex h-[90vh] w-[100vw] items-center justify-center justify-items-center">
        <ParticlesComponent id="particles" />
        <LoginCard />
      </section>
    </>
  );
}

export default Login;
