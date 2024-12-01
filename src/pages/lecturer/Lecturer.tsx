import { startTransition, useEffect, useState } from "react";
import Loader from "@/common/Loader";
import DefaultLayout from "@/layout/DefaultLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Calendar from "./Calendar";
import Students from "./Students";
import Attendance from "./Attendance";

function Lecturer() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startTransition(() => {
      setTimeout(() => setLoading(false), 1000);
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
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
