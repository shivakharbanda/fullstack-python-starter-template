import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/app-layout'
import ProtectedRoute from './components/protected-route'
import NotFoundPage from './pages/NotFoundPage'
import DashboardPage from './pages/DashboardPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

export default function Router() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes with app layout */}
            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/dashboard" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Route>
        </Routes>
    )
}
