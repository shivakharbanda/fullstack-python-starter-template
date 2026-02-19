import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Router from './Router'
import { AuthProvider } from './contexts/AuthContext'

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
}
