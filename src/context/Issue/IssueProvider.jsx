import { useIssue } from '../../hook/useIssue'
import { IssueContext } from './IssueContext'

const IssueProvider = ({ children }) => {
    const {
        issue,
        isLoadingIssue
    } = useIssue()

    return (
        <IssueContext.Provider
            value={{
                issue,
                isLoadingIssue
            }}
        >
            {children}
        </IssueContext.Provider>
    )
}

export default IssueProvider