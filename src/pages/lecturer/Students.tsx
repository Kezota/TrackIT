import { Profile } from "@/types/profile";
import person from "/src/data/images/person.jpg";
import StudentCard from "@/components/StudentCard";

const studentsDummy: Profile[] = [
  {
    fullName: "Kezia Meilany Tandapai",
    location: "Jakarta, Indonesia",
    studentId: "2702272823",
    dateOfBirth: "21/02/1997",
    phoneNumber: "082291565600",
    email: "kezia.tandapai@binus.ac.id",
    role: "student",
    photo: person,
  },
  {
    fullName: "William Hartanto",
    location: "Jakarta, Indonesia",
    studentId: "2702272823",
    dateOfBirth: "21/02/1997",
    phoneNumber: "082291565600",
    email: "kezia.tandapai@binus.ac.id",
    role: "student",
    photo: person,
  },
  {
    fullName: "Rainer Yesaya Villareal",
    location: "Jakarta, Indonesia",
    studentId: "2702272823",
    dateOfBirth: "21/02/1997",
    phoneNumber: "082291565600",
    email: "kezia.tandapai@binus.ac.id",
    role: "student",
    photo: person,
  },
];

export default function Students() {
  return (
    <>
      <h1 className="mb-4 mt-2 text-2xl font-bold md:mx-[140px] md:mb-8">
        Student List
      </h1>
      <div className="mb-0 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mx-[140px] lg:grid-cols-3">
        {studentsDummy.map((student, index) => {
          return <StudentCard key={index} {...student} />;
        })}
      </div>
    </>
  );
}
