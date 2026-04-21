import IssueDetails from '../components/IssueDetails'
import IssueProvider from '../context/Issue/IssueProvider'

const IssuePage = () => {

    return (
        <IssueProvider>
            <IssueDetails />
        </IssueProvider>
    )
}

export default IssuePage