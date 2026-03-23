import { useState } from 'react';

function useLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return {
        email,
        setEmail,
        password,
        setPassword,
    }
}

export default useLogin
