// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CreateTeam from "./pages/coach/CreateTeam";
import MyTeamPage from "./pages/coach/MyTeamPage";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeamReviewPage from "./pages/admin/MyTeamPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "admin", element: <AdminLogin /> },
      { path: "register", element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <RoleRoute allow={["COACH"]} />,
            children: [
              { path: "create-team", element: <CreateTeam /> },
              { path: "update-team/:id", element: <MyTeamPage /> },
            ],
          },
          {
            element: <RoleRoute allow={["ADMIN"]} />,
            children: [
              { path: "admin-dashboard", element: <AdminDashboard /> },
              { path: "review-team/:id", element: <TeamReviewPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;