import { useEffect, useState } from "react";
import Loader from "@/common/Loader";
import DefaultLayout from "@/layout/DefaultLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Calendar from "./Calendar";
import Students from "./Students";
import Attendance from "./Attendance";
import getLoggedUser from "@/helper/getLoggedUser";
import { getProfileByEmail } from "@/services/apiProfiles";
import { Profile } from "@/types/profile";
import NoProfile from "../profile/NoProfile";
import NavBar from "@/components/NavBar";
import { Footer } from "@/components/Footer";

function Lecturer() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
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

  if (!currentUser || currentUser.role !== "lecturer") {
    return (
      <>
        <NavBar currentNav="lecturer" />
        <NoProfile title="Please login as lecturer first!" />
        <Footer />
      </>
    );
  }

  return (
    <DefaultLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="students" element={<Students />} />
        <Route path="attendance" element={<Attendance />} />
      </Routes>
    </DefaultLayout>
  );
}

export default Lecturer;
