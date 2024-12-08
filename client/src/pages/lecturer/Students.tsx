import { Profile } from "@/types/profile";
import StudentCard from "@/components/StudentCard";
import { useEffect, useState } from "react";
import { getProfiles } from "@/services/apiProfiles";
import Loader from "@/common/Loader";

// const studentsDummy: Profile[] = [
//   {
//     fullName: "Kezia Meilany Tandapai",
//     location: "Jakarta, Indonesia",
//     studentId: "2702272823",
//     dateOfBirth: "21/02/1997",
//     phoneNumber: "082291565600",
//     email: "kezia.tandapai@binus.ac.id",
//     role: "student",
//     photo: person,
//   },
//   {
//     fullName: "William Hartanto",
//     location: "Jakarta, Indonesia",
//     studentId: "2702272823",
//     dateOfBirth: "21/02/1997",
//     phoneNumber: "082291565600",
//     email: "kezia.tandapai@binus.ac.id",
//     role: "student",
//     photo: person,
//   },
//   {
//     fullName: "Rainer Yesaya Villareal",
//     location: "Jakarta, Indonesia",
//     studentId: "2702272823",
//     dateOfBirth: "21/02/1997",
//     phoneNumber: "082291565600",
//     email: "kezia.tandapai@binus.ac.id",
//     role: "student",
//     photo: person,
//   },
// ];

export default function Students() {
  const [students, setStudents] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProfiles();
      setStudents(data);
      setLoading(false);
    };

    setTimeout(fetchData, 500);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="mb-4 mt-2 text-2xl font-bold md:mx-[140px] md:mb-8">
        Student List
      </h1>
      <div className="mb-0 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mx-[140px] lg:grid-cols-3">
        {students.map((student, index) => {
          if (student.role === "student") {
            return <StudentCard key={index} {...student} />;
          }
        })}
      </div>
    </>
  );
}
