import { useContext } from 'react'
import { IssueContext } from '../../context/Issue/IssueContext'
import Section from '../Section'

const IssueHeader = () => {
    const { issue } = useContext(IssueContext)

    console.log(issue)

    return (
        <Section>
            <div className="h1">{issue.title}</div>
        </Section>
    )
}

export default IssueHeader