export type Profile = {
  id: number;
  fullName: string;
  location: string;
  studentId: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  role: "student" | "lecturer" | "staff";
  photo: string;
  password: string;
};
