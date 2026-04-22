import { useContext } from 'react'
import Section from '../Section'
import { IssueContext } from '../../context/Issue/IssueContext'
import Span from '../Span'
import { formatDate } from '../../utils/dataFormatter'
import { formatFileSize } from '../../utils/fileFormatter'

const IssueDescriptionAndFiles = () => {
    const { issue } = useContext(IssueContext)
    const description = issue.commentaries.find((com) => com.isDescription)
    console.log(issue)
    const files = issue.attachments.length === 0 ? null : issue.attachments

    return (
        <Section className='eight'>
            <div className='row'>
                <div className='column' style={{ gap: '0' }}>
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
                </div>
                {files &&
                    <div className='issue-files' style={{ gap: '0' }}>
                        <div className='h1'>Файлы</div>
                        {files.map(file => (
                            <dd key={file.id} className='fileAttachment__file'>
                                {file.name} ({formatFileSize(file.size)})
                            </dd>
                        ))}
                    </div>}
            </div>
        </Section>
    )
}

export default IssueDescriptionAndFiles