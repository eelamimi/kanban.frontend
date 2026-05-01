/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react'
import { useIssue } from '../../hooks/useIssue'

export const IssueContext = createContext({})

const IssueProvider = ({ children }) => {
    const {
        issue,
        isLoadingIssue,
        addCommentary,
        updateCommentary,
        deleteCommentary,
        editIssue
    } = useIssue()

    return (
        <IssueContext.Provider
            value={{
                issue,
                isLoadingIssue,
                addCommentary,
                updateCommentary,
                deleteCommentary,
                editIssue
            }}
        >
            {children}
        </IssueContext.Provider>
    )
}

export default IssueProvider
