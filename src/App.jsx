import { useState, useEffect, Suspense, useCallback, memo } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Layout from './components/Layout'
import ErrorToast from './components/ErrorToast'
import { setErrorHandler } from './utils/errorHandler'
// import { useAuthCheck } from './hook/useAuthCheck'
// import ProtectedRoute from './components/ProtectedRoute'
import {
    RegistryPage,
    LoginPage,
    ProfilePage,
    TeamsPage,
    TeamPage,
    ProjectPage,
    IssuePage,
    InvitePage,
} from './pages/routeConfig'

const PageLoader = memo(() => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'white',
    }}>
        <div>Загрузка...</div>
    </div>
))

function App() {
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        setErrorHandler(setErrorMessage)
    }, [])

    const handleCloseError = useCallback(() => setErrorMessage(null), [])

    // useAuthCheck()

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/teams')
            document.title = 'Команды'
    }, [location])

    return (
        <>
            {errorMessage && (
                <ErrorToast message={errorMessage} onClose={handleCloseError} />
            )}

            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path='auth'>
                        <Route path='registry' element={<RegistryPage />} />
                        <Route path='login' element={<LoginPage />} />
                    </Route>
                    <Route element={<Layout />}>
                        <Route path='/invite' element={<InvitePage />} />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/teams' element={<TeamsPage />} />
                        <Route path='/teams/:teamId' element={<TeamPage />} />
                        <Route path='/projects/:projectId' element={<ProjectPage />} />
                        <Route path='/issue/:issuePublicId' element={<IssuePage />} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    )
}

export default App