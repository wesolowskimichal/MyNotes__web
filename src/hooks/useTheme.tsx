import { COLOR_THEME } from '@constants'
import { ColorTheme } from '@types'
import { useCallback } from 'react'

export const useTheme = () => {
  const setTheme = useCallback((theme: ColorTheme) => {
    localStorage.setItem(COLOR_THEME, theme)
    document.documentElement.setAttribute(COLOR_THEME, theme)
  }, [])

  const fetchTheme = useCallback((): ColorTheme => {
    let theme: ColorTheme | null = localStorage.getItem(COLOR_THEME) as ColorTheme | null
    if (!theme) {
      theme = 'light'
    }
    setTheme(theme)
    return theme
  }, [setTheme])

  const toggleTheme = useCallback(() => {
    let theme: ColorTheme | null = localStorage.getItem(COLOR_THEME) as ColorTheme | null
    if (!theme) {
      theme = fetchTheme()
    }
    theme = theme === 'light' ? 'dark' : 'light'
    setTheme(theme)
  }, [fetchTheme, setTheme])

  return { fetchTheme, toggleTheme }
}
