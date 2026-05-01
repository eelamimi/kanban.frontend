/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react'
import useRegister from '../../hooks/useRegister'

export const RegistryContext = createContext({})

export const RegistryProvider = ({ children }) => {
    const {
        firstName,
        setFirstName,
        secondName,
        setSecondName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword
    } = useRegister()

    return (
        <RegistryContext.Provider
            value={{
                firstName,
                setFirstName,
                secondName,
                setSecondName,
                email,
                setEmail,
                password,
                setPassword,
                confirmPassword,
                setConfirmPassword
            }}
        >
            {children}
        </RegistryContext.Provider>
    )
}
