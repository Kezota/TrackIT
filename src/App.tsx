import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Attendance = lazy(() => import("./pages/Attendance"));
const Admin = lazy(() => import("./pages/Admin"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/attendance",
    element: <Attendance />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
