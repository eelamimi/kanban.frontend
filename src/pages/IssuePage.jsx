import IssueDetails from '../components/IssueDetails'
import IssueProvider from '../context/Issue/IssueContext'

const IssuePage = () => {

    return (
        <IssueProvider>
            <IssueDetails />
        </IssueProvider>
    )
}

export default IssuePage