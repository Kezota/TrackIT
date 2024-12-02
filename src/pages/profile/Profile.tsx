import { Footer } from "@/components/Footer";
import NavBar from "../../components/NavBar";
import ProfileContent from "./ProfileContent";
import { Profile as ProfileProps } from "@/types/profile";
import { useEffect, useState } from "react";
import { getProfileByEmail } from "@/services/apiProfiles";
import Loader from "@/common/Loader";
import getLoggedUser from "@/helper/getLoggedUser";
import NoProfile from "./NoProfile";

function Profile() {
  const [currentUser, setCurrentUser] = useState<ProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const loggedUser = getLoggedUser();
        if (loggedUser) {
          const profileData = await getProfileByEmail(loggedUser);
          setCurrentUser(profileData[0]);
        } else {
          setError("No logged in user found.");
        }
      } catch (error) {
        setError("An error occurred while fetching profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <NavBar currentNav="profile" />

      {currentUser?.role === "student" ? (
        <ProfileContent {...currentUser} />
      ) : (
        <NoProfile title="Please login as student first!" />
      )}
      <Footer />
    </>
  );
}

export default Profile;
