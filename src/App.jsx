import { Routes, Route } from 'react-router'
import Registry from './pages/Registry'
import Login from './pages/Login'
import Layout from './components/Layout'
import Profile from './pages/Profile'
import { useAuthCheck } from './hook/useAuthCheck'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  // useAuthCheck()

  return (
    <Routes>
      <Route path='auth'>
        <Route path='registry' element={<Registry />} />
        <Route path='login' element={<Login />} />
      </Route>
      <Route element={<Layout />}>
        <Route path='profile' element={
          // <ProtectedRoute>
          <Profile />
          // </ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}

export default App
