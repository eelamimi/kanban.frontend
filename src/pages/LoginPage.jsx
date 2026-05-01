import LoginForm from '../components/LoginForm'
import { LoginProvider } from '../context/Login/LoginContext'

const LoginPage = () => {
    return (
        <LoginProvider>
            <LoginForm />
        </LoginProvider>
    )
}

export default LoginPage
