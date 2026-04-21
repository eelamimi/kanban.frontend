import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import RegistryPage from './pages/RegistryPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import TeamPage from './pages/TeamPage'
import TeamsPage from './pages/TeamsPage'
import ProjectPage from './pages/ProjectPage'
import UserInfoProvider from './context/UserInfo/UserInfoProvider'
import IssuePage from './pages/IssuePage'
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
                        <UserInfoProvider>
                            <ProfilePage />
                        </UserInfoProvider>
                    } />
                <Route
                    path='/teams'
                    element={
                        <UserInfoProvider>
                            <TeamsPage />
                        </UserInfoProvider>
                    } />
                <Route
                    path='/teams/:teamId'
                    element={<TeamPage />}
                />
                <Route
                    path='/projects/:projectId'
                    element={<ProjectPage />}
                />
                <Route
                    path='/issue/:issuePublicId'
                    element={<IssuePage />}
                />
            </Route>
        </Routes>
    )
}

export default App
