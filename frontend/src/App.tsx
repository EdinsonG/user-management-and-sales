import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import UsersList from "./pages/Dashboard/Users/UsersList";
import AppLayout from "./layout/AppLayout";
import AuthPageLayout from "./layout/AuthPageLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Dashboard/Home";

export default function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route element={<AuthPageLayout />}>
            <Route index element={<Navigate to="/signin" replace />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>


          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/dashboard" element={<Home />} />
              <Route path="/dashboard/users" element={<UsersList />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
