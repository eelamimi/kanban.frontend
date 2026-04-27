import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Modal from '../Modal'
import { ProjectContext } from '../../context/Project/ProjectContext'
import { IssueContext } from '../../context/Issue/IssueContext'
import { useEditIssueModal } from '../../hook/useEditIssueModal'

const EditIssueModal = ({ isOpen, onClose }) => {
    const { memberIdOptions } = useContext(ProjectContext)
    const { issue } = useContext(IssueContext)
    const [isWaiting, setIsWaiting] = useState(false)
    const {
        resetValues
    } = useEditIssueModal()

    const assigneeOption = useMemo(() => {
        if (!issue?.assignee.id) return null
        memberIdOptions.find(member => member.value === issue.assignee.id)
    }, [issue.assignee.id, memberIdOptions])

    const authorOption = useMemo(() => {
        if (!issue?.author.id) return null
        memberIdOptions.find(member => member.value === issue.author.id)
    }, [issue.author.id, memberIdOptions])

    const editIssue = useCallback(async () => {
        setIsWaiting(true)
        setIsWaiting(false)
    }, [])

    const handleClose = useCallback(() => {
        onClose()
    }, [onClose])

    useEffect(() => {
        if (issue === null || assigneeOption === null || authorOption === null)
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
        </Modal>
    )
}

export default memo(EditIssueModal)