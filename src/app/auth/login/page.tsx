import { LoginForm } from './ui/LoginForm';

export default async function LoginPage() {

  return (
    <div className="flex flex-col min-h-[88.5vh] pt-12 max-w-72 justify-center items-center m-auto">

      <h1 className={ ` text-4xl mb-5` }>Ingresar</h1>

      <LoginForm />
    </div>
  );
}