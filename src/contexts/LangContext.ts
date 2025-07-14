import { createContext } from 'react'
import type { LangContextType } from '../types'

// Инициализация состояния
export const initialState: LangContextType = {
  lang: 'en',
  setLang: () => { },
}

export const LangContext = createContext<LangContextType>(initialState)