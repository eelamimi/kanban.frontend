import { Navigate } from 'react-router';
import { useRequireAuth } from '../hook/useRequireAuth'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useRequireAuth()

    if (isLoading) {
        return <div>Проверка аутентификации...</div>
    }

    return isAuthenticated ? children : <Navigate to="/auth/login" />
};

export default ProtectedRoute
