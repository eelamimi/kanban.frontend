import useRegister from '../../hook/useRegister';
import { RegistryContext } from './RegistryContext';

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