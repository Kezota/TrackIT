import { Footer } from "@/components/Footer";
import NavBar from "../../components/NavBar";
import ProfileContent from "./ProfileContent";

function Profile() {
  return (
    <>
      <NavBar currentNav="profile" />
      <ProfileContent />
      <Footer />
    </>
  );
}

export default Profile;
