import { useState } from 'react';

function useRegister() {
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return {
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
    }
}

export default useRegister
