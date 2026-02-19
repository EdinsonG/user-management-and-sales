import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Badge from "../../../components/ui/badge/Badge";
import Button from "../../../components/ui/button/Button";
import PageMeta from "../../../components/common/PageMeta";
import DynamicTable from "../../../components/tables/list";
import { getUsers, User, deleteUser, updateUser } from "../../../services/userService";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Alert from "../../../components/ui/alert/Alert";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";

const updateUserSchema = z.object({
  fullname: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre es demasiado largo"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
    .regex(/[0-9]/, "Debe tener al menos un número"),
});

type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

export default function UsersList() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalButton, setModalButton] = useState("");
  const [actionType, setActionType] = useState<'edit' | 'delete' | 'create' | null>(null);
  
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", password: "" });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateUserFormValues>({
      resolver: zodResolver(updateUserSchema),
    });
  

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const setModal = (action: 'edit' | 'delete', userId?: number) => {
    setActionType(action);
    setSelectedUserId(userId || null);
    setError(null);

    if (action === 'delete') {
      setModalTitle("Eliminar usuario");
      setModalDescription("¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.");
      setModalButton("Eliminar");
    } else if (action === 'edit') {
      const user = users.find(u => u.id === userId);
      
      reset({
        fullname: user?.name || "",
        password: ""
      });

      setModalTitle("Editar usuario");
      setModalDescription("Modifica los datos del usuario seleccionado.");
      setModalButton("Guardar cambios");
    }
    openModal();
  };

  const handleConfirmAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (actionType === 'delete' && selectedUserId) {
        const response = await deleteUser(selectedUserId);
        setSuccess(response.message);
      } else if (actionType === 'edit' && selectedUserId) {
        const response = await updateUser(selectedUserId, formData);
        setSuccess(response.message);
      }
      
      await loadUsers();
      closeModal();
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { header: "Nombre", key: "name", render: (user: User) => <span className="font-medium text-gray-800 dark:text-white/90">{user.name}</span> },
    { header: "Correo Electrónico", key: "email" },
    { header: "Estado", key: "isActive", render: (user: User) => (
      <Badge color={user.isActive ? "success" : "error"} size="sm">{user.isActive ? "Activo" : "Inactivo"}</Badge>
    )},
    { header: "Acciones", key: "actions", render: (user: User) => (
      <div className="flex items-center gap-2">
        <button onClick={() => setModal('edit', user.id)} className="p-2 text-gray-500 hover:text-brand-500"><PencilIcon className="w-4 h-4" /></button>
        <button onClick={() => setModal('delete', user.id)} className="p-2 text-gray-500 hover:text-error-500"><TrashIcon className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <>
      <PageMeta title="Listado de usuarios" description="Gestión de Usuarios" />
      <PageBreadcrumb pageTitle="Listado de usuarios" />

      <div className="space-y-6">
        {loading ? <div className="animate-spin h-8 w-8 border-b-2 border-brand-500 mx-auto" /> : <DynamicTable columns={columns} data={users} />}
      </div>
      
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[400px] m-4">
        <div className="relative w-full bg-white rounded-3xl dark:bg-gray-900 p-6">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">{modalTitle}</h4>
          <p className="mb-6 text-sm text-gray-500">{modalDescription}</p>

          <form onSubmit={handleConfirmAction}>
            {actionType === 'edit' && (
              <div className="space-y-4 mb-6">
                <div>
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
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button size="sm" variant="outline" type="button" onClick={closeModal}>Cancelar</Button>
              <Button size="sm" color={actionType === 'delete' ? 'error' : 'primary'} type="submit" disabled={isLoading}>
                {isLoading ? "Procesando..." : modalButton}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      
      {error && <Alert variant="error" title="Error" message={error} onClose={() => setError(null)} />}
      {success && <Alert variant="success" title="Éxito" message={success} onClose={() => setSuccess(null)} />}
    </>
  );
}