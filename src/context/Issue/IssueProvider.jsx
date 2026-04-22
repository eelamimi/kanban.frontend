import { useIssue } from '../../hook/useIssue'
import { IssueContext } from './IssueContext'

const IssueProvider = ({ children }) => {
    const {
        issue,
        isLoadingIssue,
        addCommentary
    } = useIssue()

    return (
        <IssueContext.Provider
            value={{
                issue,
                isLoadingIssue,
                addCommentary
            }}
        >
            {children}
        </IssueContext.Provider>
    )
}

export default IssueProvider