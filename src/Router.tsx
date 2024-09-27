import { Routes, Route } from "react-router-dom";

import ProtectedRoutes from "./utils/protectedRoutes";

import HomePage from "./pages/homePage";
import AuthPage from "./pages/authPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
