import React from 'react'
import { Dashboard } from '../components/admin/dashboard/Dashboard'
import { Title } from '../components/ui/Title'

export default function AdminPage() {
    return (
        <div className="p-10 xl:ml-32 xl:h-[calc(100vh-120px)] mt-2 ">
            <Title title={"Dashboard Administrativo"} />
            <Dashboard />
        </div>
    )
}
