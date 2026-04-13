import Field from './Field'
import FieldSet from './FieldSet'
import Button from './Button'
import Form from './Form'
import { useContext, useState } from 'react'
import { RegistryContext } from '../context/Registry/RegistryContext'
import authAPI from '../api/authAPI'
import { Link, useNavigate } from 'react-router'
import AuthService from '../service/AuthService'

function RegistryForm() {
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
    } = useContext(RegistryContext)

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [firstNameError, setFirstNameError] = useState('')
    const [secondNameError, setSecondNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const onFirstNameInput = ({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setFirstName(value)
        setFirstNameError(hasOnlySpaces ? 'Имя обязательно для заполнения' : '')
    }

    const onSecondNameInput = ({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setSecondName(value)
        setSecondNameError(hasOnlySpaces ? 'Фамилия обязательна для заполнения' : '')
    }

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

        if (confirmPassword.length > 0) {
            setConfirmPasswordError(confirmPassword !== clearValue
                ? 'Пароли не совпадают' : '')
        }
    }

    const onConfirmPasswordInput = ({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setConfirmPassword(value)
        if (hasOnlySpaces) {
            setConfirmPasswordError('Пароли не совпадают')
        }
        else {
            setConfirmPasswordError(value !== password ? 'Пароли не совпадают' : '')
        }
    }

    const validateForm = () => {
        let isValid = true

        if (!firstName || firstName.length === 0) {
            setFirstNameError('Имя обязательно для заполнения')
            isValid = false
        }

        if (!secondName || secondName.length === 0) {
            setSecondNameError('Фамилия обязательна для заполнения')
            isValid = false
        }

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

        if (confirmPassword !== password || confirmPassword.length === 0) {
            setConfirmPasswordError('Пароли не совпадают')
            isValid = false
        }

        return isValid
    }

    const registerUser = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const response = await authAPI.registerUser({
                FirstName: firstName,
                SecondName: secondName,
                Email: email,
                Password: password,
                ConfirmPassword: confirmPassword
            })

            AuthService.setUserInfo(response)
            navigate('/profile')
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Form className='registry'>
            <FieldSet title='Регистрация'>
                <Field
                    id='firstName'
                    type='text'
                    label='Имя'
                    value={firstName}
                    onInput={onFirstNameInput}
                    error={firstNameError}
                    autoComplete='given-name'
                    required
                />
                <Field
                    id='secondName'
                    type='text'
                    label='Фамилия'
                    value={secondName}
                    onInput={onSecondNameInput}
                    error={secondNameError}
                    autoComplete='family-name'
                    required
                />
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
                    autoComplete='new-password'
                    required
                />
                <Field
                    id='confirmPassword'
                    type='password'
                    label='Подтвердите пароль'
                    value={confirmPassword}
                    onInput={onConfirmPasswordInput}
                    error={confirmPasswordError}
                    autoComplete='new-password'
                    required
                />
                <Button
                    type='submit'
                    isDisabled={isLoading}
                    onClick={registerUser}
                >
                    Зарегистрироваться
                </Button>
                <Link to='/auth/login'>
                    Уже есть аккаунт? Войти
                </Link>
            </FieldSet >
        </Form>
    )
}

export default RegistryForm