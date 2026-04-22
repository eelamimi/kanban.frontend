import { useContext } from 'react'
import Section from '../Section'
import { IssueContext } from '../../context/Issue/IssueContext'
import Span from '../Span'
import { formatDate } from '../../utils/dataFormatter'
import { formatFileSize } from '../../utils/fileFormatter'

const IssueDescriptionAndFiles = () => {
    const { issue } = useContext(IssueContext)
    const description = issue.commentaries.find((com) => com.isDescription)
    const files = issue.attachments.length === 0 ? null : issue.attachments

    return (
        <Section className='eight'>
            <div className='row' style={{ gap: '1rem' }}>
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
                    <div className='issue-files__container'>
                        <div className='h1'>Файлы</div>
                        <div className="issue-files__files">
                            {files.map(file => (
                                <span key={file.id} className='issue-files__file'>
                                    {file.fileName} ({formatFileSize(file.size)})
                                </span>
                            ))}
                        </div>
                    </div>}
            </div>
        </Section>
    )
}

export default IssueDescriptionAndFiles