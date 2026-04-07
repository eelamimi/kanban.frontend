import { useState, useCallback } from 'react'

export const useAddIssueModal = ({ curUser }) => {
    const [title, setTitle] = useState('')
    const [assignee, setAssignee] = useState(null)
    const [author, setAuthor] = useState(curUser)
    const [issueType, setIssueType] = useState(null)
    const [priority, setPriority] = useState(null)
    const [description, setDescription] = useState('')
    const [storyPoints, setStoryPoints] = useState(1)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorAssignee, setErrorAssignee] = useState('')
    const [errorIssueType, setErrorIssueType] = useState('')
    const [errorPriority, setErrorPriority] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [attachedFiles, setAttachedFiles] = useState([])

    const onTitleInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setTitle(value)
        setErrorTitle(hasOnlySpaces ? 'Название обязательно' : '')
    }, [])

    const onAssigneeInput = useCallback((selected) => {
        setAssignee(selected)
        setErrorAssignee('')
    }, [])

    const onIssueTypeInput = useCallback((selected) => {
        setIssueType(selected)
        setErrorIssueType('')
    }, [])

    const onPriorityInput = useCallback((selected) => {
        setPriority(selected)
        setErrorPriority('')
    }, [])

    const onDescriptionInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setDescription(value)
        setErrorDescription(hasOnlySpaces ? 'Описание обязательно' : '')
    }, [])

    const validateValues = useCallback(() => {
        let isValid = true

        let clearValue = title.trim()
        let hasOnlySpaces = title.length > 0 && clearValue.length === 0
        if (hasOnlySpaces || title.length === 0) {
            setErrorTitle('Название обязательно')
            isValid = false
        }

        if (assignee === null) {
            setErrorAssignee('Исполнитель обязателен')
            isValid = false
        }

        if (issueType === null) {
            setErrorIssueType('Тип проблемы обязателен')
            isValid = false
        }

        if (priority === null) {
            setErrorPriority('Приоритет проблемы обязателен')
            isValid = false
        }

        clearValue = description.trim()
        hasOnlySpaces = description.length > 0 && clearValue.length === 0
        if (hasOnlySpaces || description.length === 0) {
            setErrorDescription('Описание обязательно')
            isValid = false
        }

        return isValid
    }, [
        title,
        assignee,
        issueType,
        priority,
        description
    ])

    const resetValues = useCallback((curUser) => {
        setTitle('')
        setErrorTitle('')
        setAssignee(null)
        setErrorAssignee('')
        setAuthor(curUser)
        setStoryPoints(1)
        setDescription('')
        setErrorDescription('')
        setIssueType(null)
        setErrorIssueType('')
        setPriority(null)
        setErrorPriority('')
        setAttachedFiles([])
    }, [])

    return {
        title,
        assignee,
        author,
        issueType,
        priority,
        description,
        storyPoints,
        attachedFiles,

        errorTitle,
        errorAssignee,
        errorIssueType,
        errorPriority,
        errorDescription,

        setTitle,
        setAssignee,
        setAuthor,
        setIssueType,
        setPriority,
        setDescription,
        setStoryPoints,
        setAttachedFiles,

        onTitleInput,
        onAssigneeInput,
        onIssueTypeInput,
        onPriorityInput,
        onDescriptionInput,

        validateValues,
        resetValues,
    }
}
