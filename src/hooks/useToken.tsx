import { ACCESS_TOKEN, REFRESH_TOKEN } from '@constants'
import { Token } from '@types'
import { useCallback } from 'react'

export const useToken = () => {
  const fetchToken = useCallback((): Token | null => {
    const access = localStorage.getItem(ACCESS_TOKEN)
    const refresh = localStorage.getItem(REFRESH_TOKEN)
    if (access && refresh) {
      return { access: access, refresh: refresh }
    }
    return null
  }, [])

  const setToken = useCallback((token: Token | null) => {
    if (!token) {
      localStorage.removeItem(ACCESS_TOKEN)
      localStorage.removeItem(REFRESH_TOKEN)
      return
    }
    localStorage.setItem(ACCESS_TOKEN, token.access)
    localStorage.setItem(REFRESH_TOKEN, token.refresh)
  }, [])

  return { fetchToken, setToken }
}
