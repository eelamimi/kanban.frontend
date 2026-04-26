import { memo, useCallback, useState } from 'react'
import { saveAs } from 'file-saver';
import { formatFileSize } from '../../utils/fileFormatter';
import attachmentAPI from '../../api/attachmentAPI';
import { showError } from '../../utils/errorHandler';
import { useSearchParams } from 'react-router';

const IssueFile = ({ file }) => {
    const [searchParams] = useSearchParams()
    const projectIdFromUrl = searchParams.get('projectId')
    const [isLoading, setIsLoading] = useState(false)

    const downloadFile = useCallback(async (file) => {
        try {
            setIsLoading(true)

            const response = await attachmentAPI.get({
                id: file.id,
                projectId: projectIdFromUrl
            })

            const binaryString = atob(response)
            const bytes = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i)
            }
            const blob = new Blob([bytes], { type: file.contentType })
            saveAs(blob, file.fileName)
        } catch {
            showError('Ошибка получения файла')
        } finally {
            setIsLoading(false)
        }
    }, [projectIdFromUrl])

    return (
        <a
            className='issue-files__file'
            onClick={(e) => {
                e.preventDefault();
                downloadFile(file);
            }}
            href="#"
        >
            {isLoading
                ? 'Загрузка...'
                : `${file.fileName} ${formatFileSize(file.size)}`}
        </a>
    )
}

export default memo(IssueFile)
