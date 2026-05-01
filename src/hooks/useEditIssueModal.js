import { useCallback } from 'react'
import { useIssueFormFields } from './useIssueFormFields'
import { issuePriorityOptions, issueTypeOptions } from '../consts/issueConsts'

export const useEditIssueModal = () => {
    const formFields = useIssueFormFields()

    const resetValues = useCallback((issue, assignee, author, issueDescription) => {
        formFields.resetValues({
            title: issue.title,
            assignee,
            author,
            issueType: issueTypeOptions[issue.issueType],
            priority: issuePriorityOptions[4 - issue.issuePriority],
            storyPoints: issue.storyPoints,
            description: issueDescription,
        })
    }, [formFields])

    return {
        ...formFields,
        resetValues,
    }
}
