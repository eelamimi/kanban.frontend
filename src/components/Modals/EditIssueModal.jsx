import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Modal from '../Modal'
import { ProjectContext } from '../../context/Project/ProjectContext'
import { IssueContext } from '../../context/Issue/IssueContext'
import { useEditIssueModal } from '../../hook/useEditIssueModal'
import { issueTypeOptions, issuePriorityOptions } from '../../consts/issueConsts'
import Field from '../Field'
import FileAttachmentField from '../FileAttachmentField'
import SelectField from '../SelectField'
import TextareaField from '../TextAreaField'
import { showError } from '../../utils/errorHandler'

const MAX_FILE_SIZE = 20 * 1024 * 1024

const EditIssueModal = ({ isOpen, onClose }) => {
    const { memberIdOptions } = useContext(ProjectContext)
    const { issue, editIssue } = useContext(IssueContext)
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
    } = useEditIssueModal()

    const assigneeOption = useMemo(() => {
        if (!issue?.assignee?.id || !memberIdOptions.length) return null
        return memberIdOptions.find(member => member.value === issue.assignee.id)
    }, [issue.assignee.id, memberIdOptions])

    const authorOption = useMemo(() => {
        if (!issue?.author?.id || !memberIdOptions.length) return null
        return memberIdOptions.find(member => member.value === issue.author.id)
    }, [issue.author.id, memberIdOptions])

    const editIssueHandler = useCallback(async () => {
        if (!validateValues())
            return false

        setIsWaiting(true)

        const formData = new FormData()
        formData.append('IssueId', issue.id)
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
                showError(`Файлы превышают 20MB: ${oversizedFiles.map(f => f.name).join(', ')}`)
                setIsWaiting(false)
                return false
            }

            attachedFiles.forEach((file) => {
                formData.append('Files', file)
            })
        }

        try {
            await editIssue(formData)
            return true
        } catch {
            return false
        }
        finally {
            setIsWaiting(false)
        }
    }, [
        assignee.value,
        attachedFiles,
        author.value,
        description,
        issue.id,
        issueType.value,
        priority.value,
        storyPoints,
        title,
        validateValues,
        editIssue,
    ])

    const handleClose = useCallback(() => {
        resetValues(issue, assigneeOption, authorOption)
        onClose()
    }, [assigneeOption, authorOption, issue, resetValues, onClose])

    useEffect(() => {
        if (!issue || !assigneeOption || !authorOption)
            return
        resetValues(issue, assigneeOption, authorOption)
    }, [assigneeOption, authorOption, issue, resetValues])

    return (
        <Modal
            isOpen={isOpen}
            title={'Изменить проблему'}
            actionTitle={'Изменить'}
            onAction={editIssueHandler}
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
                    onChange={setAssignee}
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
                label='Прикрепить дополнительные файлы'
                files={attachedFiles}
                setFiles={setAttachedFiles}
            />
        </Modal>
    )
}

export default memo(EditIssueModal)