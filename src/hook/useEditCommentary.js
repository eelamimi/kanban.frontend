import { useCallback, useState } from 'react'
import { showError } from '../utils/errorHandler'

export const useEditCommentary = ({ innerHandler }) => {
    const [isEditingCommentary, setIsEditingCommentary] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [content, setContent] = useState('')
    const [error, setError] = useState('')

    const onContentInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setContent(value)
        setError(hasOnlySpaces || clearValue.length === 0 ? 'Комментарий обязателен' : '')
    }, [])

    const handleEditCommentary = useCallback(async () => {
        if (isEditingCommentary) {
            setIsEditing(true)

            const clearValue = content.trim()
            const hasOnlySpaces = content.length > 0 && clearValue.length === 0

            if (hasOnlySpaces || clearValue.length === 0) {
                setError('Комментарий обязателен')
                return
            }

            try {
                await innerHandler()
            } catch {
                showError('Ошибка изменения комментария')
            }

            setIsEditing(false)
        }
        setIsEditingCommentary(!isEditingCommentary)
    }, [isEditingCommentary, content, innerHandler])

    const handleDeleteCommentary = useCallback(() => {
        console.log('exit')
        setIsDeleting(true)
    }, [])

    return {
        content,
        error,
        isEditingCommentary,
        isDeleting,
        isEditing,
        setContent,
        onContentInput,
        setError,
        handleEditCommentary,
        handleDeleteCommentary
    }
}