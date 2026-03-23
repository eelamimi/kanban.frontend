import useLogin from '../../hook/useLogin'
import { LoginContext } from './LoginContext'

export const LoginProvider = ({ children }) => {
    const {
        email,
        setEmail,
        password,
        setPassword
    } = useLogin()

    return (
        <LoginContext.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword
            }}
        >
            {children}
        </LoginContext.Provider>
    )
}