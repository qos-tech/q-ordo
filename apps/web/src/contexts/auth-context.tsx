'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { User } from '@repo/database' // <-- REFINEMENT: Import User type from our shared DB package
import { api } from '@/lib/api'

/**
 * The shape of the data provided by our AuthContext.
 */
interface AuthContextType {
  isAuthenticated: boolean
  user: Omit<User, 'passwordHash'> | null // We'll never expose the password hash to the frontend
  isLoading: boolean // Useful for showing a loading state while checking the session.
  signOut: () => void
}

/**
 * The AuthContext itself, initialized with a default value.
 */
const AuthContext = createContext({} as AuthContextType)

/**
 * The AuthProvider component is responsible for fetching the user session
 * and providing the authentication state to the entire application.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    /**
     * This function runs once on application load to check for a valid session.
     */
    async function loadUserFromSession() {
      try {
        const { user: userData } = await api
          .get('auth/me')
          .json<{ user: AuthContextType['user'] }>()

        setUser(userData)
      } catch (error) {
        // This is not an error, but the expected state for unauthenticated users.
        console.log('No active session found on initial load.')
      } finally {
        setIsLoading(false)
      }
    }

    loadUserFromSession()
  }, [])

  /**
   * Clears the user session.
   */
  function signOut() {
    // TODO: Call an API route to clear the httpOnly cookie.
    setUser(null)
    console.log('User signed out.')
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * A custom hook that simplifies the use of our AuthContext in other components.
 */
export const useAuth = () => useContext(AuthContext)
