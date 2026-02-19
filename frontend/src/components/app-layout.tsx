import { Outlet } from 'react-router-dom'
import { AppHeader } from './app-header'
import { AppFooter } from './app-footer'
import { BottomNav } from './app-bottomnav'

export function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col w-full">
            <AppHeader />
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-grow flex-col">
                <div className='flex flex-grow flex-col'>
                    <Outlet />
                </div>
                <AppFooter />
            </div>
            <BottomNav />
        </div>
    )
}
