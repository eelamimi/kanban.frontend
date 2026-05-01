/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react'
import useLogin from '../../hooks/useLogin'

export const LoginContext = createContext({})

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
