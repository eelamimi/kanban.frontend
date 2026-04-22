import { useContext } from 'react'
import Section from '../Section'
import { IssueContext } from '../../context/Issue/IssueContext'
import Span from '../Span'
import { formatDate } from '../../utils/dataFormatter'

const IssueDescription = () => {
    const { issue } = useContext(IssueContext)
    const description = issue.commentaries.find((com) => com.isDescription)

    return (
        <Section className='eight'>
            <div className='subsection'>
                <div className='h1'>Описание</div>
                {description.lastEditedAt !== description.createdAt &&
                    <Span
                        className='issue-description-edited-at'
                        label='Изменено:'
                        value={formatDate(description.lastEditedAt)}
                    />}
            </div>
            <Span className='multiline' value={description.content} />
        </Section>
    )
}

export default IssueDescription