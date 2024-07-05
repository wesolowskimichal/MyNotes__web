import { ACCESS_TOKEN, REFRESH_TOKEN } from '@constants'
import { useTheme } from '@hooks'
import { Token } from '@types'
import { useState } from 'react'
import api from 'services/Api'

const Home = () => {
  console.log('render home')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { toggleTheme } = useTheme()

  const handleOnClick = () => {
    const call = async () => {
      const response = await api.post('/api/token/', { username: username, password: password })
      if (response.status === 200) {
        const token: Token = response.data
        localStorage.setItem(ACCESS_TOKEN, token.access)
        localStorage.setItem(REFRESH_TOKEN, token.refresh)
      }
    }
    call()
  }

  return (
    <>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleOnClick}>a</button>
    </>
  )
}

export default Home
