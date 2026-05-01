import { useState, useCallback } from 'react'
import { isBlank } from '../utils/fieldValidation'

export function useInlineEdit(initialValue, validate) {
    const [value, setValue] = useState(initialValue)
    const [error, setError] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const handleChange = useCallback((newValue) => {
        setValue(newValue)
        setError(isBlank(newValue) ? validate?.message || 'Название обязательно' : '')
    }, [validate])

    const startEditing = useCallback(() => {
        setIsEditing(true)
    }, [])

    const stopEditing = useCallback(() => {
        setIsEditing(false)
    }, [])

    const isValid = useCallback(() => {
        if (isBlank(value)) {
            setError(validate?.message || 'Название обязательно')
            return false
        }
        return true
    }, [value, validate])

    return {
        value,
        setValue,
        error,
        setError,
        isEditing,
        handleChange,
        startEditing,
        stopEditing,
        setIsEditing,
        isValid,
    }
}
