import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'
import type { AuthUser } from './AuthContext'

const RoleRoute = ({ allow }: { allow: Array<AuthUser['role']> }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allow.includes(user.role)) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin-dashboard' : '/create-team'} replace />
  }

  return <Outlet />
}

export default RoleRoute
