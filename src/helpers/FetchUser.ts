import { User } from '@types'
import api from 'services/Api'

export const FetchUser = async (): Promise<User | null> => {
  try {
    const userResponse = await api.get('/api/user/')
    if (userResponse.status === 200) {
      return userResponse.data
    }
  } catch (error) {
    console.log(error)
  }
  return null
}
