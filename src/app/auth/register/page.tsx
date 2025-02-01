import { RegisterForm } from "./ui/RegisterForm";



export default async function RegisterPage() {

  return (
    <div className="flex flex-col min-h-[88.5vh] pt-12 max-w-72 justify-center items-center m-auto">

      <h1 className={ ` text-4xl mb-5` }>Registrarse</h1>

      <RegisterForm />

    </div>
  );
}