import { Footer } from "@/components/Footer";
import NavBar from "../../components/NavBar";
import ProfileContent from "./ProfileContent";
import { Profile as ProfileProps } from "@/types/profile";
import { useEffect, useState } from "react";
import { getProfiles } from "@/services/apiProfiles";

function Profile() {
  const [profiles, setProfiles] = useState<ProfileProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProfiles();
      setProfiles(data);
      setLoading(false);
    };

    setTimeout(fetchData, 500);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar currentNav="profile" />
      <ProfileContent {...profiles[0]} />
      <Footer />
    </>
  );
}

export default Profile;
