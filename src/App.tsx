import { AppRrovider } from '@contexts'
import Home from 'pages/home'

function App() {
  return (
    <AppRrovider>
      <h1>Hello</h1>
      <Home />
    </AppRrovider>
  )
}

export default App
