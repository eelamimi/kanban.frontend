import { useState, useMemo, useCallback } from 'react'
import Modal from './Modal'
import Field from './Field'
import SelectField from './SelectField'
import AuthService from '../service/AuthService'
import TextareaField from './TextAreaField'
import Button from './Button'

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
    const [issueTitle, setIssueTitle] = useState('')
    const [assigneeId, setAssigneeId] = useState('')
    const [authorId, setAuthorId] = useState(AuthService.getUserInfo().userProfileId)
    const [issueDescription, setIssueDescription] = useState('')
    const [issueType, setIssueType] = useState('')
    const [issuePriority, setIssuePriority] = useState('')
    const [attachedFiles, setAttachedFiles] = useState([])

    const memberIdOptions = useMemo(() => {
        return members.map((member) => ({
            value: member.id,
            label: `${member.firstName} ${member.secondName}`
        }))
    }, [members])

    const onIssueTitleInput = ({ target }) => {
        const { value } = target
        setIssueTitle(value)
    }

    const onIssueDescriptionInput = ({ target }) => {
        const { value } = target
        setIssueDescription(value)
    }

    const handleFileSelect = useCallback((event) => {
        const files = Array.from(event.target.files)
        setAttachedFiles(prev => [...prev, ...files])
    }, [])

    const removeFile = useCallback((index) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index))
    }, [])

    const formatFileSize = useCallback((bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }, [])

    const addIssue = useCallback(async () => {
        console.log('onAction addTask modal')
        console.log('Прикрепленные файлы:', attachedFiles)
        return
    }, [attachedFiles])

    return (
        <Modal
            isOpen={isOpen}
            title={'Создать проблему'}
            actionTitle={'Создать'}
            onAction={addIssue}
            onClose={onClose}
        >
            <Field
                id='issueTitle'
                inputClassName='full-width'
                type='text'
                label='Название'
                value={issueTitle}
                onInput={onIssueTitleInput}
                required
            />
            <div className='row' style={{ gap: '25px' }}>
                <SelectField
                    placeholder='Исполнитель'
                    value={assigneeId}
                    onChange={setAssigneeId}
                    options={memberIdOptions}
                />
                <SelectField
                    placeholder='Автор'
                    value={authorId}
                    onChange={setAuthorId}
                    options={memberIdOptions}
                />
            </div>
            <div className='row' style={{ gap: '25px' }}>
                <SelectField
                    placeholder='Тип'
                    value={issueType}
                    onChange={setIssueType}
                    options={issueTypeOptions}
                />
                <SelectField
                    placeholder='Приоритет'
                    value={issuePriority}
                    onChange={setIssuePriority}
                    options={issuePriorityOptions}
                />
            </div>
            <TextareaField
                id='issueDescription'
                inputClassName='full-width'
                textareaClassName="full-width"
                type='text'
                label='Описание'
                value={issueDescription}
                onInput={onIssueDescriptionInput}
                required
            />
            <dl className='fileAttachment__container'>
                <dt className='fileAttachment__link'>
                    <label>Прикрепить файлы
                        <input type="file" multiple onChange={handleFileSelect} hidden />
                    </label>
                </dt>
                {attachedFiles && attachedFiles.map((file, i) => (
                    <dd key={i} className='fileAttachment__file'>
                        <Button
                            className='fileAttachment__remove'
                            onClick={() => removeFile(i)}
                        >✖</Button>
                        {file.name} ({formatFileSize(file.size)})
                    </dd>
                ))}
            </dl>
        </Modal>
    )
}

export default AddIssueModal