import { useState, useCallback } from 'react'

export const useAddCommentary = ({ onAdd }) => {
    const [commentary, setCommentary] = useState('')
    const [errorCommentary, setErrorCommentary] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onCommentaryInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setCommentary(value)
        setErrorCommentary(hasOnlySpaces ? 'Комментарий обязателен' : '')
    }, [])

    const validateAndSubmit = useCallback(async () => {
        const clearValue = commentary.trim()
        const hasOnlySpaces = commentary.length > 0 && clearValue.length === 0

        if (hasOnlySpaces || commentary.length === 0) {
            setErrorCommentary('Комментарий обязателен')
            return false
        }

        setIsSubmitting(true)
        try {
            await onAdd(commentary)
            setCommentary('')
            return true
        } catch (error) {
            setErrorCommentary(error.message)
            return false
        } finally {
            setIsSubmitting(false)
        }
    }, [commentary, onAdd])

    const resetCommentary = useCallback(() => {
        setCommentary('')
        setErrorCommentary('')
    }, [])

    return {
        commentary,
        errorCommentary,
        isSubmitting,

        onCommentaryInput,
        validateAndSubmit,
        resetCommentary,
    }
}