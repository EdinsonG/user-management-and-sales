import PageMeta from "../../components/common/PageMeta";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Inicio de sesión | Gestión de Usuarios y Ventas de Inmuebles"
        description="React + Node.js + PostgreSQL"
      />
      <SignInForm />
    </>
  );
}
