import { useState } from 'react'
import styles from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import api from '@services'
import { Token } from '@types'
import useApp from '@contexts'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setToken } = useApp()

  const handleLoginClick = () => {
    const fetchToken = async () => {
      const tokenResponse = await api.post('/api/token/', { username: username, password: password })
      if (tokenResponse.status == 200) {
        setToken(tokenResponse.data as Token)
        navigate('/')
      } else {
        console.log('wrong pass or usernma')
      }
    }

    fetchToken()
  }

  return (
    <div className={styles.Form}>
      <div className={styles.FormContent}>
        <h1>Login</h1>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <p>
          You don't have account? <Link to={'/'}>Register</Link>
        </p>

        <button onClick={handleLoginClick}>LOGIN</button>
      </div>
    </div>
  )
}

export default Login
