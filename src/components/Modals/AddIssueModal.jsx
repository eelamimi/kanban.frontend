import { useCallback, memo, useContext, useState, useEffect } from 'react'
import { useAddIssueModal } from '../../hook/useAddIssueModal'
import FileAttachmentField from '../FileAttachmentField'
import TextareaField from '../TextAreaField'
import SelectField from '../SelectField'
import Modal from '../Modal'
import Field from '../Field'
import issueAPI from '../../api/issueAPI'
import { ProjectContext } from '../../context/Project/ProjectContext'
import { issuePriorityOptions, issueTypeOptions } from '../../consts/issueConsts'

const MAX_FILE_SIZE = 20 * 1024 * 1024

function AddIssueModal({ isOpen, onClose }) {
    const {
        project,
        setProject,
        memberIdOptions,
        curUser
    } = useContext(ProjectContext)
    const [isWaiting, setIsWaiting] = useState(false)

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
        setProject(prev => ({
            ...prev,
            columns: prev.columns.map(column =>
                column.position === 0
                    ? { ...column, issues: [...column.issues, issue] }
                    : column
            )
        }))

        setIsWaiting(false)
        return true
    }, [
        project,
        setProject,
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

    useEffect(() => {
        function setDefaultAuthor() {
            resetValues(curUser)
        }

        setDefaultAuthor()
    }, [curUser, resetValues])

    return (
        <Modal
            isOpen={isOpen}
            title={'Добавить проблему'}
            actionTitle={'Добавить'}
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
                    withImg={true}
                />
                <SelectField
                    placeholder='Автор'
                    value={author}
                    onChange={setAuthor}
                    options={memberIdOptions}
                    error={errorAuthor}
                    withImg={true}
                />
            </div>
            <div className='row' style={{ gap: '25px' }}>
                <SelectField
                    placeholder='Тип'
                    value={issueType}
                    onChange={onIssueTypeInput}
                    options={issueTypeOptions}
                    error={errorIssueType}
                    withImg={true}
                />
                <SelectField
                    placeholder='Приоритет'
                    value={priority}
                    onChange={onPriorityInput}
                    options={issuePriorityOptions}
                    error={errorPriority}
                    withImg={true}
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
                textareaClassName='full-width'
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