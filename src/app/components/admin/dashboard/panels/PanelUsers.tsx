import Link from 'next/link'
import { IoPersonOutline } from 'react-icons/io5'
import { TopInfo } from './TopInfo'
import { readAllUsers } from '@/actions/users/readAllUsers'


export const PanelUsers = async () => {

    const { ok, users } = await readAllUsers();

    if (!ok || !users) return null

    return (
        <Link
            href={'/admin/users'}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 hover:text-white"
        >
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <IoPersonOutline size={30} />
            </div>
            <TopInfo label='usuarios' totalCount={users.length} />
            
            <div className="flex justify-between items-center border-t p-4 antialiased tracking-normal font-sans text-sm font-extralight leading-snug">
      
        
            </div>
        </Link>
    )
}