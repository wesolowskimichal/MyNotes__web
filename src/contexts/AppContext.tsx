import { FetchUser } from '@helpers'
import { useToken, useTheme } from '@hooks'
import { Token, User } from '@types'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

type AppContextType = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  setToken: (token: Token) => void
}

export const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  setToken: () => {}
})

type AppRpoviderProps = {
  children: ReactNode
}

export const AppRrovider = ({ children }: AppRpoviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<Token | null>(null)
  const { fetchToken, setToken: __setToken } = useToken()
  const { fetchTheme } = useTheme()

  useEffect(() => {
    // const fetchUser = async () => {
    // const user = await FetchUser()
    // setUser(user)
    // }
    const token = fetchToken()
    if (token) {
      // fetchUser()
      setToken(token)
    }
    fetchTheme()
  }, [fetchTheme, fetchToken])

  useEffect(() => {
    const fetchUser = async () => {
      const user = await FetchUser()
      setUser(user)
    }
    // const token = fetchToken()
    if (token) {
      fetchUser()
    }
  }, [token])

  const handleSetToken = (token: Token) => {
    __setToken(token)
    setToken(token)
  }

  return <AppContext.Provider value={{ user, setUser, setToken: handleSetToken }}>{children}</AppContext.Provider>
}

const useApp = () => useContext(AppContext)

export default useApp
