import { LoginForm } from './ui/LoginForm';

export default async function LoginPage() {

  return (
    <div className=" flex flex-col min-h-[88.5vh] pt-12 max-w-72 justify-center items-center m-auto">
      <div className='bg-amber-400 p-4 md:absolute md:top-2 md:left-2'>
        <h2>Demo: </h2>
        <div className='flex flex-col md:flex-row gap-4 w-full'>
          <p className='flex flex-col'>
            <strong>
              Admin:
            </strong>
            <span>
              Email: admin@admin.com
            </span>
            <span>
              Password: admin123
            </span>

          </p>

          <p className='flex flex-col'>
            <strong>
              Usuario:
            </strong>
            <span>
              Email: user@user.com
            </span>
            <span>
              Password: user123
            </span>

          </p>

        </div>
      </div>
      <h1 className={` text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />
    </div>
  );
}