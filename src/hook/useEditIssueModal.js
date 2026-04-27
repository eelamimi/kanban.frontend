import { useState, useCallback } from 'react'
import { issuePriorityOptions, issueTypeOptions } from '../consts/issueConsts'

export const useEditIssueModal = () => {
    const [title, setTitle] = useState('')
    const [assignee, setAssignee] = useState(null)
    const [author, setAuthor] = useState(null)
    const [issueType, setIssueType] = useState(null)
    const [priority, setPriority] = useState(null)
    const [description, setDescription] = useState('')
    const [storyPoints, setStoryPoints] = useState(1)
    const [errorTitle, setErrorTitle] = useState('')
    const [errorAssignee, setErrorAssignee] = useState('')
    const [errorAuthor, setErrorAuthor] = useState('')
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

    const onAuthorInput = useCallback((selected) => {
        setAuthor(selected)
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

        if (author == null) {
            setErrorAuthor('Автор обязателен')
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
        author,
        issueType,
        priority,
        description
    ])

    const resetValues = useCallback((issue, assignee, author) => {
        setTitle(issue.title)
        setAssignee(assignee)
        setAuthor(author)
        setIssueType(issueTypeOptions[issue.issueType])
        setPriority(issuePriorityOptions[4 - issue.issuePriority])
        setStoryPoints(issue.storyPoints)
        setDescription(issue.commentaries.find(com => com.isDescription).content)
        setAttachedFiles([])

        setErrorTitle('')
        setErrorAssignee('')
        setErrorAuthor('')
        setErrorDescription('')
        setErrorIssueType('')
        setErrorPriority('')
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
        errorAuthor,
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
        onAuthorInput,
        onIssueTypeInput,
        onPriorityInput,
        onDescriptionInput,

        validateValues,
        resetValues,
    }
}