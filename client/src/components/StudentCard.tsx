import { Profile } from "@/types/profile";

export default function StudentCard({ photo, fullName, studentId }: Profile) {
  return (
    <div className="align-center flex flex-col items-center justify-center rounded-md bg-slate-100 p-5">
      <img src={photo} alt={fullName} className="mb-7 rounded-sm" />
      <h1 className="mb-2 text-center text-[20px] font-semibold leading-[1.3] md:text-[24px]">
        {fullName}
      </h1>
      <p className="text-[14px] md:text-[16px]">{studentId}</p>
    </div>
  );
}
