import Field from './Field'
import FieldSet from './FieldSet'
import Button from './Button'
import Form from './Form'
import { useContext, useState } from 'react'
import authAPI from '../api/authAPI'
import { LoginContext } from '../context/Login/LoginContext'
import { useNavigate, Link } from 'react-router'
import AuthService from '../service/AuthService'

function LoginForm() {
    const {
        email,
        setEmail,
        password,
        setPassword,
    } = useContext(LoginContext)

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const onEmailInput = (event) => {
        const value = event.target.value
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/

        setEmail(value)

        if (value.length === 0) {
            setEmailError('')
        }
        else {
            if (hasOnlySpaces) {
                setEmailError('Email обязателен для заполнения')
            } else {
                if (!emailRegex.test(value)) {
                    setEmailError('Введите корректный email адрес')
                } else {
                    setEmailError('')
                }
            }
        }
    }

    const onPasswordInput = ({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setPassword(value)
        setPasswordError(hasOnlySpaces ? 'Пароль обязателен для заполнения' : '')
    }

    const validateForm = () => {
        let isValid = true

        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/
        if (!email || email.length === 0) {
            setEmailError('Email обязателен для заполнения')
            isValid = false
        } else if (!emailRegex.test(email)) {
            setEmailError('Введите корректный email адрес')
            isValid = false
        }

        if (!password || password.length === 0) {
            setPasswordError('Пароль обязателен для заполнения')
            isValid = false
        } else if (password.length < 6) {
            setPasswordError('Пароль должен содержать минимум 6 символов')
            isValid = false
        }

        return isValid
    }

    const loginUser = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const response = await authAPI.authenticateUser({
                Email: email,
                Password: password,
            })

            AuthService.setUserInfo(response)
            navigate('/profile')
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Form className='login'>
            <FieldSet title="Вход в аккаунт">
                <Field
                    id='email'
                    type='email'
                    label='Электронная почта'
                    value={email}
                    onInput={onEmailInput}
                    error={emailError}
                    autoComplete='email'
                    required
                />
                <Field
                    id='password'
                    type='password'
                    label='Пароль'
                    value={password}
                    onInput={onPasswordInput}
                    error={passwordError}
                    autoComplete='current-password'
                    required
                />
                <Button
                    type='submit'
                    isDisabled={isLoading}
                    onClick={loginUser}
                >
                    Войти
                </Button>
                <Link to='/auth/registry'>
                    Нет аккаунта? Зарегистрироваться
                </Link>
            </FieldSet >
        </Form>
    )
}

export default LoginForm