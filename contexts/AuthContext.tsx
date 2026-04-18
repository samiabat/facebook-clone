'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  initStore,
  getUserByEmail,
  getUserById,
  createUser,
  setSession,
  clearSession,
  getSession,
} from '@/lib/localStore'

export interface AuthUser {
  id: string
  name: string
  email: string
  profileImage: string | null
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => void
  register: (name: string, email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  register: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initStore()
    const session = getSession()
    if (session) {
      const u = getUserById(session.userId)
      if (u) {
        setUser({ id: u.id, name: u.name, email: u.email, profileImage: u.profileImage })
      }
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, password: string): void => {
    let u = getUserByEmail(email)
    if (!u) {
      const name = email
        .split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
      u = createUser(name, email, password)
    }
    setSession(u.id)
    setUser({ id: u.id, name: u.name, email: u.email, profileImage: u.profileImage })
  }

  const register = (name: string, email: string, password: string): void => {
    let u = getUserByEmail(email)
    if (!u) {
      u = createUser(name, email, password)
    }
    setSession(u.id)
    setUser({ id: u.id, name: u.name, email: u.email, profileImage: u.profileImage })
  }

  const logout = (): void => {
    clearSession()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
