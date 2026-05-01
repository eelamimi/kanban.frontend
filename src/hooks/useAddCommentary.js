import { useState, useCallback } from 'react'
import { MAX_FILE_SIZE } from '../consts/fileConsts'
import { isBlank } from '../utils/fieldValidation'

export const useAddCommentary = ({ onAdd }) => {
    const [commentary, setCommentary] = useState('')
    const [errorCommentary, setErrorCommentary] = useState('')
    const [attachedFiles, setAttachedFiles] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onCommentaryInput = useCallback(({ target }) => {
        const { value } = target
        setCommentary(value)
        setErrorCommentary(isBlank(value) ? 'Комментарий обязателен' : '')
    }, [])

    const resetValues = useCallback(() => {
        setCommentary('')
        setErrorCommentary('')
        setAttachedFiles([])
    }, [])

    const validateAndSubmit = useCallback(async () => {
        if (isBlank(commentary)) {
            setErrorCommentary('Комментарий обязателен')
            return false
        }

        const formData = new FormData()
        formData.append('Content', commentary)

        if (attachedFiles && attachedFiles.length > 0) {
            const oversizedFiles = attachedFiles.filter(file => file.size > MAX_FILE_SIZE)

            if (oversizedFiles.length > 0) {
                console.error('Файлы превышают 20MB:', oversizedFiles.map(f => f.name))
                return false
            }

            attachedFiles.forEach((file) => {
                formData.append('Files', file)
            })
        }

        setIsSubmitting(true)
        try {
            await onAdd(formData)
            resetValues()
            return true
        } catch (error) {
            setErrorCommentary(error.message)
            return false
        } finally {
            setIsSubmitting(false)
        }
    }, [commentary, attachedFiles, onAdd, resetValues])

    return {
        commentary,
        errorCommentary,
        attachedFiles,
        isSubmitting,

        onCommentaryInput,
        setAttachedFiles,
        validateAndSubmit,
        resetCommentary: resetValues,
    }
}
