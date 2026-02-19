import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Label from "../form/Label";
import Alert from "../ui/alert/Alert";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import { registerUser } from "../../services/authService";

const signUpSchema = z.object({
  fullname: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre es demasiado largo"),
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Formato de correo inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
    .regex(/[0-9]/, "Debe tener al menos un número"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {  
      const dataToSend = {
        name: data.fullname,
        email: data.email,
        password: data.password
      };   
      await registerUser(dataToSend);
      setSuccess("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      reset();
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Error desconocido";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="border border-gray-300 rounded-[5px] p-6">
          <div className="flex flex-col items-center mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Registro
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tu correo electrónico y contraseña para registrarte!
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div className="sm:col-span-1">
                  <Label>
                    Nombre completo<span className="text-error-500">*</span>
                  </Label>
                  <Input 
                    placeholder="Ingresa tu nombre completo" 
                    error={!!errors.fullname}
                    hint={errors.fullname?.message}
                    {...register("fullname")}
                    disabled={isLoading}
                  />
                </div>            
                <div>
                  <Label>
                    Correo electrónico<span className="text-error-500">*</span>
                  </Label>
                  <Input 
                    placeholder="info@gmail.com"
                    error={!!errors.email}
                    hint={errors.email?.message}
                    {...register("email")}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label>
                    Contraseña<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Ingresa tu contraseña"
                      error={!!errors.password}
                      hint={errors.password?.message}
                      {...register("password")}
                      disabled={isLoading}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Button className="w-full" size="sm" disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Iniciar sesión"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="flex flex-col items-center mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                ¿Ya tienes una cuenta? {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="error" title="Error de acceso" message={error} />
      )}
      
      {success && (
        <Alert variant="success" title="Bienvenido" message={success} />
      )}
      
    </div>
  );
}
