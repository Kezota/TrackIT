import { Footer } from "@/components/Footer";
import NavBar from "../../components/NavBar";
import ProfileContent from "./ProfileContent";
import { Profile as ProfileProps } from "@/types/profile";
import person from "/src/data/images/person.jpg";

const profileDummy: ProfileProps = {
  fullName: "Kezia Meilany Tandapai",
  location: "Jakarta, Indonesia",
  gender: "Female",
  dateOfBirth: "21/02/1997",
  phoneNumber: "082291565600",
  email: "kezia.tandapai@binus.ac.id",
  role: "student",
  photo: person,
};

function Profile() {
  return (
    <>
      <NavBar currentNav="profile" />
      <ProfileContent {...profileDummy} />
      <Footer />
    </>
  );
}

export default Profile;
