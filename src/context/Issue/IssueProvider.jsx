import { useIssue } from '../../hook/useIssue'
import { IssueContext } from './IssueContext'

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