import { useCallback } from 'react'
import { useIssueFormFields } from './useIssueFormFields'

export const useAddIssueModal = ({ curUser }) => {
    const formFields = useIssueFormFields({
        initialValues: { author: curUser }
    })

    const resetValues = useCallback(() => {
        formFields.resetValues({ author: curUser })
    }, [formFields, curUser])

    return {
        ...formFields,
        resetValues,
    }
}
