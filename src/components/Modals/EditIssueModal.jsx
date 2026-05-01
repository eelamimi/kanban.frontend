import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Modal from '../Modal'
import { ProjectContext } from '../../context/Project/ProjectContext'
import { IssueContext } from '../../context/Issue/IssueContext'
import { useEditIssueModal } from '../../hooks/useEditIssueModal'
import {
    issueTypeOptions,
    issuePriorityOptions,
    issuePrioritiesValue,
    issueTypesValue
} from '../../consts/issueConsts'
import { MAX_FILE_SIZE } from '../../consts/fileConsts'
import Field from '../Field'
import FileAttachmentField from '../FileAttachmentField'
import SelectField from '../SelectField'
import TextareaField from '../TextAreaField'
import { showError } from '../../utils/errorHandler'

const EditIssueModal = ({ isOpen, onClose }) => {
    const { memberIdOptions } = useContext(ProjectContext)
    const { issue, editIssue } = useContext(IssueContext)
    const [isWaiting, setIsWaiting] = useState(false)
    const initDescription = useMemo(() => {
        return issue?.commentaries.find(com => com.isDescription).content
    }, [issue])
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

        setAssignee,
        setAuthor,
        setStoryPoints,
        setAttachedFiles,

        onTitleInput,
        onIssueTypeInput,
        onPriorityInput,
        onDescriptionInput,

        validateValues,
        resetValues,
    } = useEditIssueModal()

    const assigneeOption = useMemo(() => {
        if (!issue?.assignee?.id || !memberIdOptions.length) return null
        return memberIdOptions.find(member => member.value === issue.assignee.id)
    }, [issue?.assignee?.id, memberIdOptions])

    const authorOption = useMemo(() => {
        if (!issue?.author?.id || !memberIdOptions.length) return null
        return memberIdOptions.find(member => member.value === issue.author.id)
    }, [issue?.author?.id, memberIdOptions])

    const editIssueHandler = useCallback(async () => {
        if (!validateValues())
            return false

        setIsWaiting(true)

        try {
            const hasNoChanges = title === issue.title &&
                description === initDescription &&
                assignee?.value === issue?.assignee?.id &&
                author?.value === issue?.author?.id &&
                priority.value === issuePrioritiesValue[issue.issuePriority] &&
                issueType.value === issueTypesValue[issue.issueType] &&
                attachedFiles.length === 0

            if (hasNoChanges)
                return true

            const formData = new FormData()
            formData.append('Id', issue.id)
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

            await editIssue(formData)
            return true
        } catch {
            return false
        }
        finally {
            setIsWaiting(false)
        }
    }, [
        validateValues,
        title,
        issue.title,
        issue?.assignee?.id,
        issue?.author?.id,
        issue.issuePriority,
        issue.issueType,
        issue.id,
        description,
        initDescription,
        assignee?.value,
        author?.value,
        priority?.value,
        issueType?.value,
        attachedFiles,
        storyPoints,
        editIssue
    ])

    const handleClose = useCallback(() => {
        resetValues(issue, assigneeOption, authorOption, initDescription)
        onClose()
    }, [
        assigneeOption,
        authorOption,
        issue,
        initDescription,
        resetValues,
        onClose
    ])

    useEffect(() => {
        if (!issue || !assigneeOption || !authorOption)
            return
        resetValues(issue, assigneeOption, authorOption, initDescription)
    }, [assigneeOption,
        authorOption,
        issue,
        initDescription,
        resetValues,
    ])

    return (
        <Modal
            isOpen={isOpen}
            title={'Редактирование проблемы'}
            actionTitle={'Редактировать'}
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