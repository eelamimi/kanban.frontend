import { useState, useMemo, useCallback } from 'react'
import Modal from './Modal'
import Field from './Field'
import SelectField from './SelectField'
import AuthService from '../service/AuthService'
import TextareaField from './TextAreaField'
import FileAttachmentField from './FileAttachmentField'

const issueTypeOptions = [
    { value: 'Bug', label: 'Баг' },
    { value: 'Story', label: 'История' },
    { value: 'Task', label: 'Задача' },
    { value: 'Investigation', label: 'Расследование' }
]
const issuePriorityOptions = [
    { value: 'Minimal', label: 'Минимальный' },
    { value: 'Low', label: 'Низкий' },
    { value: 'Medium', label: 'Средний' },
    { value: 'High', label: 'Высокий' },
    { value: 'Critical', label: 'Критический' }
]

function AddIssueModal({ members, isOpen, onClose }) {
    const userProfileId = AuthService.getUserInfo().userProfileId
    const [title, setTitle] = useState('')
    const [assignee, setAssignee] = useState('')
    const [author, setAuthor] = useState(userProfileId)
    const [issueType, setIssueType] = useState('')
    const [priority, setPriority] = useState('')
    const [description, setDescription] = useState('')
    const [errorTitle, setErrorTitle] = useState('')
    const [errorAssignee, setErrorAssignee] = useState('')
    const [errorIssueType, setErrorIssueType] = useState('')
    const [errorPriority, setErrorPriority] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [attachedFiles, setAttachedFiles] = useState([])

    const memberIdOptions = useMemo(() => {
        return members.map((member) => ({
            value: member.id,
            label: `${member.firstName} ${member.secondName}`
        }))
    }, [members])

    const onTitleInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setTitle(value)
        setErrorTitle(hasOnlySpaces ? 'Название обязательно' : '')
    }, [])

    const onAssigneeInput = useCallback((value) => {
        setAssignee(value)
        setErrorAssignee('')
    }, [])

    const onIssueTypeInput = useCallback((value) => {
        setIssueType(value)
        setErrorIssueType('')
    }, [])

    const onPriorityInput = useCallback((value) => {
        setPriority(value)
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

        if (assignee === '') {
            setErrorAssignee('Исполнитель обязателен')
            isValid = false
        }

        if (issueType === '') {
            setErrorIssueType('Тип проблемы обязателен')
            isValid = false
        }

        if (priority === '') {
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

    const addIssue = useCallback(async () => {
        console.log(validateValues())
        return false
    }, [validateValues])

    const handleClose = useCallback(() => {
        setTitle('')
        setErrorTitle('')
        setAssignee('')
        setErrorAssignee('')
        setAuthor(userProfileId)
        setDescription('')
        setErrorDescription('')
        setIssueType('')
        setErrorIssueType('')
        setPriority('')
        setErrorPriority('')
        setAttachedFiles([])
        onClose()
    }, [
        userProfileId,
        onClose
    ])

    return (
        <Modal
            isOpen={isOpen}
            title={'Создать проблему'}
            actionTitle={'Создать'}
            onAction={addIssue}
            onClose={handleClose}
        >
            <Field
                id='issueTitle'
                inputClassName='full-width'
                type='text'
                label='Название'
                value={title}
                onInput={onTitleInput}
                error={errorTitle}
            />
            <div className='row' style={{ gap: '25px' }}>
                <SelectField
                    placeholder='Исполнитель'
                    value={assignee}
                    onChange={onAssigneeInput}
                    options={memberIdOptions}
                    error={errorAssignee}
                />
                <SelectField
                    placeholder='Автор'
                    value={author}
                    onChange={setAuthor}
                    options={memberIdOptions}
                />
            </div>
            <div className='row' style={{ gap: '25px' }}>
                <SelectField
                    placeholder='Тип'
                    value={issueType}
                    onChange={onIssueTypeInput}
                    options={issueTypeOptions}
                    error={errorIssueType}
                />
                <SelectField
                    placeholder='Приоритет'
                    value={priority}
                    onChange={onPriorityInput}
                    options={issuePriorityOptions}
                    error={errorPriority}
                />
            </div>
            <TextareaField
                id='issueDescription'
                inputClassName='full-width'
                textareaClassName="full-width"
                type='text'
                label='Описание'
                value={description}
                onInput={onDescriptionInput}
                error={errorDescription}
            />
            <FileAttachmentField
                files={attachedFiles}
                setFiles={setAttachedFiles}
            />
        </Modal>
    )
}

export default AddIssueModal