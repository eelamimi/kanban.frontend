import { useCallback, useContext } from 'react'
import { saveAs } from 'file-saver';
import Section from '../Section'
import { IssueContext } from '../../context/Issue/IssueContext'
import Span from '../Span'
import { formatDate } from '../../utils/dataFormatter'
import { formatFileSize } from '../../utils/fileFormatter'

const IssueDescriptionAndFiles = () => {
    const { issue } = useContext(IssueContext)
    const description = issue.commentaries.find((com) => com.isDescription)
    const files = issue.attachments.length === 0 ? null : issue.attachments

    const downloadFile = useCallback((file) => {
        try {
            const binaryString = atob(file.content)
            const bytes = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i)
            }
            const blob = new Blob([bytes], { type: file.contentType })
            saveAs(blob, file.fileName)
        } catch (error) {
            console.error('Download error:', error)
            alert('Не удалось загрузить файл')
        }
    }, [])

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
                                // TODO
                                // 1. create component IssueFile
                                // 2. create attachmentAPI.js
                                // 3. /api/attachments/{attachmentId}
                                // 4. refactor func downloadFile to add flag of downloading for better UX
                                <a
                                    className='issue-files__file'
                                    key={file.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        downloadFile(file);
                                    }}
                                    href="#"
                                >
                                    {file.fileName} ({formatFileSize(file.size)})
                                </a>
                            ))}
                        </div>
                    </div>}
            </div>
        </Section>
    )
}

export default IssueDescriptionAndFiles