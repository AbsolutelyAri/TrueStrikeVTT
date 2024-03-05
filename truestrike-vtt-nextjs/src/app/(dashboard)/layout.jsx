import React from 'react'
import Navbar from './_components/Navbar'
import Sidebar from './_components/sidebar'

const DashboardLayout = ({children}) => {
    return (
        <main className='h-full'>
            <Sidebar/>
            <div className='pl-[60px] h-full'>
                <div className="flex gap-x-3 h-full">
                    <div className="h-full flex-1">
                        <Navbar />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DashboardLayout;