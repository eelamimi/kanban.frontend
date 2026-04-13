import { useMemo, useCallback, memo, useContext, useState } from 'react'
import { useAddIssueModal } from '../../hook/useAddIssueModal'
import AuthService from '../../service/AuthService'
import FileAttachmentField from '../FileAttachmentField'
import TextareaField from '../TextAreaField'
import SelectField from '../SelectField'
import Modal from '../Modal'
import Field from '../Field'
import issueAPI from '../../api/issueAPI'
import { ProjectContext } from '../../context/Project/ProjectContext'

const issueTypeOptions = Object.freeze([
    { value: 'Bug', label: 'Ошибка' },
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

function AddIssueModal({ setColumns, isOpen, onClose }) {
    const { project } = useContext(ProjectContext)
    const [isWaiting, setIsWaiting] = useState(false)
    const memberIdOptions = useMemo(() => {
        return project.members.map((member) => ({
            value: member.id,
            label: `${member.firstName} ${member.secondName}`
        }))
    }, [project.members])
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
        storyPoints,
        attachedFiles,
        errorTitle,
        errorAssignee,
        errorAuthor,
        errorIssueType,
        errorPriority,
        errorDescription,
        setAuthor,
        setStoryPoints,
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
        setIsWaiting(true)
        if (!validateValues()) {
            setIsWaiting(false)
            return false
        }

        const formData = new FormData()
        formData.append('ProjectId', project.id)
        formData.append('Title', title)
        formData.append('AssigneeId', assignee.value)
        formData.append('AuthorId', author.value)
        formData.append('IssueType', issueType.value)
        formData.append('IssuePriority', priority.value)
        formData.append('Description', description)
        formData.append('StoryPoints', storyPoints)

        if (attachedFiles && attachedFiles.length > 0) {
            const oversizedFiles = attachedFiles.filter(file => file.size > MAX_FILE_SIZE)

            if (oversizedFiles.length > 0) {
                console.error('Файлы превышают 20MB:', oversizedFiles.map(f => f.name))
                setIsWaiting(false)
                return false
            }

            attachedFiles.forEach((file) => {
                formData.append('Files', file)
            })
        }

        const issue = await issueAPI.addIssue(formData)
        setColumns(prevColumns =>
            prevColumns.map(column =>
                column.position === 0
                    ? { ...column, issues: [...column.issues, issue] }
                    : column
            )
        )

        setIsWaiting(false)
        return true
    }, [
        project.id,
        setColumns,
        title,
        assignee,
        author,
        issueType,
        priority,
        description,
        storyPoints,
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
            isDisabled={isWaiting}
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
                    error={errorAuthor}
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
            <Field
                id='storyPoints'
                inputClassName='full-width'
                type='number'
                label='Оценка сложности'
                value={storyPoints}
                onInput={(event) => { setStoryPoints(event.target.value) }}
            />
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