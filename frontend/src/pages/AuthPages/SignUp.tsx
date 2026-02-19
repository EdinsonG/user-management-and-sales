import PageMeta from "../../components/common/PageMeta";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Registro | Gestión de Usuarios y Ventas de Inmuebles"
        description="React + Node.js + PostgreSQL"
      />
      <SignUpForm />
    </>
  );
}
