import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  // Verificamos si existe el token en el localStorage
  const token = localStorage.getItem("token");

  // Si no hay token, redirigimos al login
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // Si hay token, permitimos el acceso a las rutas hijas (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;