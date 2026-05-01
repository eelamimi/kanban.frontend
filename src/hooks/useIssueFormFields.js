import { useState, useCallback } from 'react'
import { isBlank } from '../utils/fieldValidation'

const TEXT_FIELD_MESSAGES = {
    title: 'Название обязательно',
    description: 'Описание обязательно',
}

const SELECT_FIELD_MESSAGES = {
    assignee: 'Исполнитель обязателен',
    author: 'Автор обязателен',
    issueType: 'Тип проблемы обязателен',
    priority: 'Приоритет проблемы обязателен',
}

export const useIssueFormFields = ({ initialValues = {} } = {}) => {
    const [title, setTitle] = useState(initialValues.title ?? '')
    const [assignee, setAssignee] = useState(initialValues.assignee ?? null)
    const [author, setAuthor] = useState(initialValues.author ?? null)
    const [issueType, setIssueType] = useState(initialValues.issueType ?? null)
    const [priority, setPriority] = useState(initialValues.priority ?? null)
    const [description, setDescription] = useState(initialValues.description ?? '')
    const [storyPoints, setStoryPoints] = useState(initialValues.storyPoints ?? 1)
    const [attachedFiles, setAttachedFiles] = useState([])

    const [errorTitle, setErrorTitle] = useState('')
    const [errorAssignee, setErrorAssignee] = useState('')
    const [errorAuthor, setErrorAuthor] = useState('')
    const [errorIssueType, setErrorIssueType] = useState('')
    const [errorPriority, setErrorPriority] = useState('')
    const [errorDescription, setErrorDescription] = useState('')

    const onTitleInput = useCallback(({ target }) => {
        const { value } = target
        setTitle(value)
        setErrorTitle(isBlank(value) ? TEXT_FIELD_MESSAGES.title : '')
    }, [])

    const onAssigneeInput = useCallback((selected) => {
        setAssignee(selected)
        setErrorAssignee('')
    }, [])

    const onAuthorInput = useCallback((selected) => {
        setAuthor(selected)
        setErrorAuthor('')
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
        setDescription(value)
        setErrorDescription(isBlank(value) ? TEXT_FIELD_MESSAGES.description : '')
    }, [])

    const validateValues = useCallback(() => {
        let isValid = true

        if (isBlank(title)) {
            setErrorTitle(TEXT_FIELD_MESSAGES.title)
            isValid = false
        }
        if (assignee === null) {
            setErrorAssignee(SELECT_FIELD_MESSAGES.assignee)
            isValid = false
        }
        if (author == null) {
            setErrorAuthor(SELECT_FIELD_MESSAGES.author)
            isValid = false
        }
        if (issueType === null) {
            setErrorIssueType(SELECT_FIELD_MESSAGES.issueType)
            isValid = false
        }
        if (priority === null) {
            setErrorPriority(SELECT_FIELD_MESSAGES.priority)
            isValid = false
        }
        if (isBlank(description)) {
            setErrorDescription(TEXT_FIELD_MESSAGES.description)
            isValid = false
        }

        return isValid
    }, [title, assignee, author, issueType, priority, description])

    const clearErrors = useCallback(() => {
        setErrorTitle('')
        setErrorAssignee('')
        setErrorAuthor('')
        setErrorIssueType('')
        setErrorPriority('')
        setErrorDescription('')
    }, [])

    const resetValues = useCallback((values) => {
        setTitle(values.title ?? '')
        setAssignee(values.assignee ?? null)
        setAuthor(values.author ?? null)
        setIssueType(values.issueType ?? null)
        setPriority(values.priority ?? null)
        setStoryPoints(values.storyPoints ?? 1)
        setDescription(values.description ?? '')
        setAttachedFiles([])
        clearErrors()
    }, [clearErrors])

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
