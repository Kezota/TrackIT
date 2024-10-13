import { useEffect, useState } from "react";
import Loader from "@/common/Loader";
import DefaultLayout from "@/layout/DefaultLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import FormLayout from "@/components/FormLayout";
import Tables from "@/components/Tables";
import Settings from "@/components/Settings";
import Alerts from "@/components/Alerts";
import SignIn from "@/components/SignIn";

function Lecturer() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              {/* <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" /> */}
              <Dashboard />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              {/* <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" /> */}
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              {/* <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" /> */}
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              {/* <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" /> */}
              <Settings />
            </>
          }
        />

        <Route
          path="/ui/alerts"
          element={
            <>
              {/* <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" /> */}
              <Alerts />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              {/* <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" /> */}
              <SignIn />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default Lecturer;
