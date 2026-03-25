import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import RegistryPage from './pages/RegistryPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import TeamPage from './pages/TeamPage'
import TeamsPage from './pages/TeamsPage'
// import { useAuthCheck } from './hook/useAuthCheck'
// import ProtectedRoute from './components/ProtectedRoute'

function App() {
    // useAuthCheck()
    return (
        <Routes>
            <Route path='auth'>
                <Route path='registry' element={<RegistryPage />} />
                <Route path='login' element={<LoginPage />} />
            </Route>
            <Route element={<Layout />}>
                <Route
                    path='profile'
                    element={
                        // <ProtectedRoute>
                        <ProfilePage />
                        // </ProtectedRoute>
                    } />
                <Route
                    path='/teams'
                    element={<TeamsPage />}
                />
                <Route
                    path='/teams/:teamId'
                    element={<TeamPage />}
                />
            </Route>
        </Routes>
    )
}

export default App
