import { useContext } from 'react'
import IssueHeader from './IssueDetails/IssueHeader'
import Spinner from './Spinner'
import { IssueContext } from '../context/Issue/IssueContext'
import Section from './Section'
import IssueDescriptionAndFiles from './IssueDetails/IssueDescriptionAndFiles'
import IssueCommentaries from './IssueDetails/IssueCommentaries'

const IssueDetails = () => {
    const { isLoadingIssue } = useContext(IssueContext)

    if (isLoadingIssue)
        return (
            <>
                <Section className='eight'>
                    <Spinner />
                </Section>
                <Section className='eight'>
                    <Spinner />
                </Section>
                <Section className='eight'>
                    <Spinner />
                </Section>
            </>
        )

    return (
        <>
            <IssueHeader />
            <IssueDescriptionAndFiles />
            <IssueCommentaries />
        </>
    )
}

export default IssueDetails