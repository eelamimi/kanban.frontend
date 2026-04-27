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

const EditIssueModal = ({ isOpen, onClose }) => {
    const { memberIdOptions } = useContext(ProjectContext)
    const { issue } = useContext(IssueContext)
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

    const editIssue = useCallback(async () => {
        setIsWaiting(true)
        setIsWaiting(false)
    }, [])

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
            onAction={editIssue}
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