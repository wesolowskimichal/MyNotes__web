import { ACCESS_TOKEN, REFRESH_TOKEN } from '@constants'
import { AppRrovider } from '@contexts'
import Home from 'pages/home'
import Login from 'pages/login/Login'
import ProtectedRoute from 'pages/protectedRoute/ProtectedRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from './shadcn-components/ui/toaster'

const LoginWrapper = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
  return <Login />
}

function App() {
  return (
    <AppRrovider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginWrapper />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AppRrovider>
  )
}

export default App
