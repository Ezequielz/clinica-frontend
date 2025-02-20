
import { readAllUsers } from '@/actions/users/readAllUsers';
import { UserInfo } from './UserInfo';

export const UserTable = async () => {

    const { ok, users } = await readAllUsers();

    if (!ok || !users) {
        return <p>Error al obtener los usuarios</p>;
    }
    if (users.length === 0) {
        return <p>No hay usuarios registrados</p>;
    }

    return (
        <table className="min-w-full">
            <thead>
                <tr>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Imagen</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Nombre</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Email</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        DNI</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Tel</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Rol</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Eliminar</th>

                </tr>
            </thead>


            <tbody className="bg-white  overflow-y-auto">
                {
                    users.map(user => (
                        <UserInfo 
                            key={user.id}
                            user={user}
                        />
                    ))
                }

            </tbody>
           


        </table>
    )
}