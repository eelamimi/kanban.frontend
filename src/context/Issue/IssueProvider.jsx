import { useIssue } from '../../hook/useIssue'
import { IssueContext } from './IssueContext'

const IssueProvider = ({ children }) => {
    const {
        issue,
        isLoadingIssue,
        addCommentary,
        updateCommentary,
        deleteCommentary
    } = useIssue()

    return (
        <IssueContext.Provider
            value={{
                issue,
                isLoadingIssue,
                addCommentary,
                updateCommentary,
                deleteCommentary
            }}
        >
            {children}
        </IssueContext.Provider>
    )
}

export default IssueProvider