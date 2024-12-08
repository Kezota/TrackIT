import Breadcrumb from "./ui/Breadcrumb";
import TableThree from "./ui/AttendanceList";

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
