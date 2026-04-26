import { useIssue } from '../../hook/useIssue'
import { IssueContext } from './IssueContext'

const IssueProvider = ({ children }) => {
    const {
        issue,
        isLoadingIssue,
        addCommentary,
        updateCommentary
    } = useIssue()

    return (
        <IssueContext.Provider
            value={{
                issue,
                isLoadingIssue,
                addCommentary,
                updateCommentary
            }}
        >
            {children}
        </IssueContext.Provider>
    )
}

export default IssueProvider