import { ACCESS_TOKEN, COLOR_THEME, REFRESH_TOKEN } from '@constants'
import { ColorTheme, Token } from '@types'
import { useCallback } from 'react'

export const useLocalData = () => {
  const fetchToken = useCallback((): Token | null => {
    const access = localStorage.getItem(ACCESS_TOKEN)
    const refresh = localStorage.getItem(REFRESH_TOKEN)
    if (access && refresh) {
      return { access: access, refresh: refresh }
    }
    return null
  }, [])

  const fetchTheme = useCallback((): ColorTheme => {
    const theme = localStorage.getItem(COLOR_THEME)
    if (!theme) {
      localStorage.setItem(COLOR_THEME, 'light')
      document.documentElement.setAttribute('data-theme', 'light')
      return 'light'
    }
    document.documentElement.setAttribute('data-theme', theme)
    return theme as ColorTheme
  }, [])

  const toggleTheme = useCallback(() => {
    const theme = localStorage.getItem('data-theme')
    if (theme === 'light') {
      localStorage.setItem('data-theme', 'dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      localStorage.setItem('data-theme', 'light')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  return { fetchToken, fetchTheme, toggleTheme }
}
