import { Link } from "react-router";
import { useEffect, useState } from "react";
import { 
  XMarkIcon,
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon 
} from "@heroicons/react/24/outline";

interface AlertProps {
  variant: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  showLink?: boolean;
  linkHref?: string;
  linkText?: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  message,
  showLink = false,
  linkHref = "#",
  linkText = "Saber más",
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  const variantClasses = {
    success: {
      container: "border-success-500 bg-white dark:bg-gray-900 shadow-lg",
      icon: "text-success-500",
      fill: "#10b981"
    },
    error: {
      container: "border-error-500 bg-white dark:bg-gray-900 shadow-lg",
      icon: "text-error-500",
      fill: "#f04438"
    },
    warning: {
      container: "border-warning-500 bg-white dark:bg-gray-900 shadow-lg",
      icon: "text-warning-500",
      fill: "#f79009"
    },
    info: {
      container: "border-blue-500 bg-white dark:bg-gray-900 shadow-lg",
      icon: "text-blue-500",
      fill: "#3b82f6"
    },
  };

  const icons = {
    success: <CheckCircleIcon className="w-6 h-6" />,
    error: <ExclamationCircleIcon className="w-6 h-6" />,
    warning: <ExclamationTriangleIcon className="w-6 h-6" />,
    info: <InformationCircleIcon className="w-6 h-6" />,
  };

  return (
    <div
      className={`fixed top-5 right-5 z-[99999] w-full max-w-[380px] rounded-2xl border p-4 
      transition-all duration-300 ease-in-out flex items-start gap-3
      ${variantClasses[variant].container} 
      ${isExiting ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100 animate-in fade-in slide-in-from-bottom-5"}`}
    >
      {/* Icono */}
      <div className={`shrink-0 ${variantClasses[variant].icon}`}>
        {icons[variant]}
      </div>

      {/* Contenido */}
      <div className="flex-1 pr-6">
        <h4 className="text-sm font-bold text-gray-800 dark:text-white/90">
          {title}
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {message}
        </p>

        {showLink && (
          <Link
            to={linkHref}
            className="inline-block mt-2 text-xs font-semibold text-brand-500 hover:underline"
          >
            {linkText}
          </Link>
        )}
      </div>

      {/* Botón Cerrar */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      {/* Barra de progreso visual (Opcional) */}
      <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 transition-all duration-[5000ms] ease-linear w-full origin-left scale-x-0 group-hover:scale-x-100" />
    </div>
  );
};

export default Alert;