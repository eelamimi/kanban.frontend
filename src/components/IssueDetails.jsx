import { useContext } from 'react'
import IssueHeader from './IssueDetails/IssueHeader'
import Spinner from './Spinner'
import { IssueContext } from '../context/Issue/IssueContext'
import Section from './Section'

const IssueDetails = () => {
    const { isLoadingIssue } = useContext(IssueContext)

    if (isLoadingIssue)
        return (
            <Section>
                <Spinner />
            </Section>
        )

    return (
        <IssueHeader />
    )
}

export default IssueDetails