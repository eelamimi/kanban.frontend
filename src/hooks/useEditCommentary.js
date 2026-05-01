import { useCallback, useState } from 'react'
import { showError } from '../utils/errorHandler'
import { isBlank } from '../utils/fieldValidation'

export const useEditCommentary = ({ editInnerHandler, deleteInnerHandler }) => {
    const [isEditingCommentary, setIsEditingCommentary] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [content, setContent] = useState('')
    const [error, setError] = useState('')

    const onContentInput = useCallback(({ target }) => {
        const { value } = target
        setContent(value)
        setError(isBlank(value) ? 'Комментарий обязателен' : '')
    }, [])

    const handleEditCommentary = useCallback(async () => {
        if (isEditingCommentary) {
            setIsEditing(true)

            if (isBlank(content)) {
                setError('Комментарий обязателен')
                return
            }

            try {
                await editInnerHandler(content)
            } catch {
                showError('Ошибка изменения комментария')
            }

            setIsEditing(false)
        }
        setIsEditingCommentary(!isEditingCommentary)
    }, [isEditingCommentary, content, editInnerHandler])

    const handleDeleteCommentary = useCallback(async () => {
        setIsDeleting(true)

        try {
            await deleteInnerHandler()
        } catch {
            showError('Ошибка удаления комментария')
        }

        setIsDeleting(false)
    }, [deleteInnerHandler])

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
