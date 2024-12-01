export type Profile = {
  fullName: string;
  location: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  role: "student" | "lecturer" | "staff";
  photo: string;
};
