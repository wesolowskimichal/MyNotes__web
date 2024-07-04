import { FetchUser } from '@helpers'
import { useToken, useTheme } from '@hooks'
import { User } from '@types'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

type AppContextType = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

export const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {}
})

type AppRpoviderProps = {
  children: ReactNode
}

export const AppRrovider = ({ children }: AppRpoviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const { fetchToken } = useToken()
  const { fetchTheme } = useTheme()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await FetchUser()
      setUser(user)
    }
    const token = fetchToken()
    if (token) {
      fetchUser()
    }
    fetchTheme()
  }, [fetchTheme, fetchToken])

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>
}

const useApp = () => useContext(AppContext)

export default useApp
