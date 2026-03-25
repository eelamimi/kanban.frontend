import LoginForm from '../components/LoginForm'
import { LoginProvider } from '../context/Login/LoginProvider'

const LoginPage = () => {
    return (
        <LoginProvider>
            <LoginForm />
        </LoginProvider>
    )
}

export default LoginPage
