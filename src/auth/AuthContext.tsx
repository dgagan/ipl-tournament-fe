import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import { ACCESS_TOKEN_KEY } from '../api/client'

export type AuthUser = {
  sub: string
  email: string
  role: 'ADMIN' | 'COACH'
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (accessToken: string) => AuthUser
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const decodeUser = (accessToken: string): AuthUser | null => {
  try {
    return jwtDecode<AuthUser>(accessToken)
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    return token ? decodeUser(token) : null
  })

  const login = (accessToken: string) => {
    const decoded = decodeUser(accessToken)
    if (!decoded) {
      throw new Error('Received an invalid access token')
    }
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    setUser(decoded)
    return decoded
  }

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: !!user, login, logout }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
