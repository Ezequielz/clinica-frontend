import React from 'react'
import { Dashboard } from '../components/admin/dashboard/Dashboard'
import { Title } from '../components/ui/Title'

export default function AdminPage() {
    return (
        <div className="px-10 xl:ml-32  ">
            <header className='py-5 z-10 fixed bg-slate-50 w-full flex gap-6 items-center'>

                <Title title={"Dashboard Administrativo"} />
            </header>


            <section className='pt-24'>
                <Dashboard />

            </section>
        </div>

    )
}
