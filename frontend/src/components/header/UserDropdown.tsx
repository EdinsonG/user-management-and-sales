import { useState, useEffect } from "react";
import { useNavigate } from "react-router"; // Cambiado a useNavigate para redirección programática
import { Dropdown } from "../ui/dropdown/Dropdown";
import { ArrowLeftStartOnRectangleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  // 1. Recuperar datos del usuario al cargar
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // 2. Lógica de Cierre de Sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeDropdown();
    navigate("/signin", { replace: true }); // replace: true evita que el usuario vuelva atrás
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400 focus:outline-none"
      >

        <ChevronDownIcon 
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-white/90">
            {user?.name || "Usuario"}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400 truncate">
            {user?.email || "correo@ejemplo.com"}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 mt-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-500 transition-colors w-full text-left"
        >
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-500" />
          Cerrar sesión
        </button>
      </Dropdown>
    </div>
  );
}