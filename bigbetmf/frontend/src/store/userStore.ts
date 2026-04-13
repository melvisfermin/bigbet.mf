import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  balance: number
  bonusBalance: number
}

interface UserStore {
  user: User | null
  token: string | null
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  setUser: (user: User) => set({ user }),
  setToken: (token: string) => {
    localStorage.setItem('token', token)
    set({ token })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  },
}))
