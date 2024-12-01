import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Attendance = lazy(() => import("./pages/Attendance"));
const Lecturer = lazy(() => import("./pages/lecturer/Lecturer"));
const Profile = lazy(() => import("./pages/profile/Profile"));
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
    path: "/lecturer/*",
    element: <Lecturer />,
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
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
