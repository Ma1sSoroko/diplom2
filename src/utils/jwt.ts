import { jwtDecode } from 'jwt-decode'
import type { JwtType } from '../types'

const JWT_KEY = 'jwt'

interface JwtUtils {
  getFromLocalStorage(): JwtType | null
  setToLocalStorage(jwt: JwtType): void
  clearJwt(): void
  isTokenExpired(access: string): boolean
}

export const jwt: JwtUtils = {
  getFromLocalStorage(): JwtType | null {
    const jwt = localStorage.getItem(JWT_KEY)

    if (jwt) {
      return JSON.parse(jwt) as JwtType
    }

    return null
  },

  setToLocalStorage(jwt: JwtType) {
    localStorage.setItem(JWT_KEY, JSON.stringify(jwt))
  },

  clearJwt() {
    localStorage.removeItem(JWT_KEY)
  },

  isTokenExpired(access: string): boolean {
    const { exp } = jwtDecode(access)

    return Date.now() >= (exp || 0) * 1000
  }
}