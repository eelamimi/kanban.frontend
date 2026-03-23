import LoginForm from '../components/LoginForm'
import { LoginProvider } from '../context/Login/LoginProvider'

const Login = () => {
    return (
        <LoginProvider>
            <LoginForm />
        </LoginProvider>
    )
}

export default Login
