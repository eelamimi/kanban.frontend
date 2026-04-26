import { useCallback, useState } from 'react'
import { saveAs } from 'file-saver';
import { formatFileSize } from '../../utils/fileFormatter';
import attachmentAPI from '../../api/attachmentAPI';
import { showError } from '../../utils/errorHandler';

const IssueFile = ({ file }) => {
    const [isLoading, setIsLoading] = useState(false)
    const downloadFile = useCallback((file) => {
        try {
            setIsLoading(true)

            const response = attachmentAPI.get({ id: file.id })

            const binaryString = atob(response)
            const bytes = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i)
            }
            const blob = new Blob([bytes], { type: file.contentType })
            saveAs(blob, file.fileName)
        } catch (error) {
            showError(error)
            // console.error('Download error:', error)
            // alert('Не удалось загрузить файл')
        } finally {
            setIsLoading(false)
        }
    }, [])

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

export default IssueFile
