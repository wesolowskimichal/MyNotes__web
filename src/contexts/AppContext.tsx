import { useLocalData } from '@hooks'
import { Token, User } from '@types'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

type AppContextType = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  token: Token | null
  setToken: Dispatch<SetStateAction<Token | null>>
}

export const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {}
})

type AppRpoviderProps = {
  children: ReactNode
}

export const AppRpovider = ({ children }: AppRpoviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<Token | null>(null)
  const { fetchToken, fetchTheme } = useLocalData()

  useEffect(() => {
    const token = fetchToken()
    setToken(token)
    fetchTheme()
  }, [])

  return <AppContext.Provider value={{ user, setUser, token, setToken }}>{children}</AppContext.Provider>
}

const useApp = () => useContext(AppContext)

export default useApp
