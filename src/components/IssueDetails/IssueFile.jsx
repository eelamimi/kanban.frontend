import { useCallback } from 'react'
import { saveAs } from 'file-saver';
import { formatFileSize } from '../../utils/fileFormatter';

const IssueFile = ({ file }) => {
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
    )
}

export default IssueFile
