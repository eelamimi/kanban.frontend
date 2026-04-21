import { useIssue } from '../../hook/useIssue'
import { RegistryContext as IssueContext } from './RegistryContext'

export const IssueProvider = ({ children }) => {
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