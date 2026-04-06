import { useMemo, useCallback, memo } from 'react'
import Modal from './Modal'
import Field from './Field'
import SelectField from './SelectField'
import AuthService from '../service/AuthService'
import TextareaField from './TextAreaField'
import FileAttachmentField from './FileAttachmentField'
import { useAddIssueModal } from '../hook/useAddIssueModal'
import issueAPI from '../api/issueAPI'

const issueTypeOptions = Object.freeze([
    { value: 'Bug', label: 'Баг' },
    { value: 'Story', label: 'История' },
    { value: 'Task', label: 'Задача' },
    { value: 'Investigation', label: 'Расследование' }
])

const issuePriorityOptions = Object.freeze([
    { value: 'Minimal', label: 'Минимальный' },
    { value: 'Low', label: 'Низкий' },
    { value: 'Medium', label: 'Средний' },
    { value: 'High', label: 'Высокий' },
    { value: 'Critical', label: 'Критический' }
])

const userProfileId = AuthService.getUserInfo().userProfileId
const MAX_FILE_SIZE = 20 * 1024 * 1024

function AddIssueModal({ projectId, members, columns, setColumns, isOpen, onClose }) {
    const memberIdOptions = useMemo(() => {
        return members.map((member) => ({
            value: member.id,
            label: `${member.firstName} ${member.secondName}`
        }))
    }, [members])
    const storyPoints = 1
    const curUser = useMemo(() =>
        memberIdOptions.find(member => member.value === userProfileId),
        [memberIdOptions])

    const {
        title,
        assignee,
        author,
        issueType,
        priority,
        description,
        attachedFiles,
        errorTitle,
        errorAssignee,
        errorIssueType,
        errorPriority,
        errorDescription,
        setAuthor,
        setAttachedFiles,
        onTitleInput,
        onAssigneeInput,
        onIssueTypeInput,
        onPriorityInput,
        onDescriptionInput,
        validateValues,
        resetValues,
    } = useAddIssueModal({ curUser })

    const addIssue = useCallback(async () => {
        if (!validateValues())
            return false

        const formData = new FormData()
        formData.append('ProjectId', projectId)
        formData.append('Title', title)
        formData.append('AssigneeId', assignee.value)
        formData.append('AuthorId', author.value)
        formData.append('IssueType', issueType.value)
        formData.append('IssuePriority', priority.value)
        formData.append('Description', description)
        formData.append('StoryPoints', storyPoints) // TODO

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

        const response = await issueAPI.addIssue(formData)

        return false
    }, [
        projectId,
        title,
        assignee,
        author,
        issueType,
        priority,
        description,
        attachedFiles,
        validateValues
    ])

    const handleClose = useCallback(() => {
        resetValues(curUser)
        onClose()
    }, [
        curUser,
        resetValues,
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

export default memo(AddIssueModal)