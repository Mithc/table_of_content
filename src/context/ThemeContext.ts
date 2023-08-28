import { createContext } from 'react'

export type Theme = 'light' | 'dark'

export const ThemeContext = createContext<Theme | undefined>(undefined)
