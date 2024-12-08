import calendar from "@/data/images/academic-calendar.jpg";

export default function Calendar() {
  return (
    <div className="align-center mx-0 my-5 flex flex-col justify-center md:mx-[60px]">
      <h1 className="mb-10 text-2xl font-bold md:mb-5">
        Academic Calendar Odd Semester 2024/2025
      </h1>
      <img
        src={calendar}
        className="max-w-[100%] md:max-w-[80%]"
        alt="Academic Calendar"
      />
    </div>
  );
}
