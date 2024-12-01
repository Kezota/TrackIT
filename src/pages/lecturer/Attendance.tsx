import AttendanceList from "@/components/ui/AttendanceList";

export default function Attendance() {
  return (
    <div>
      <h1 className="mx-0 mb-5 mt-5 text-2xl font-bold md:mx-[80px] md:mb-7 md:mt-0">
        Attendance List
      </h1>
      <AttendanceList />
    </div>
  );
}
