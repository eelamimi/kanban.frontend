import { useCallback } from 'react'
import Button from './Button'

function FileAttachmentField({ files, setFiles }) {
    const handleFileSelect = useCallback((event) => {
        const files = Array.from(event.target.files)
        setFiles(prev => [...prev, ...files])
    }, [setFiles])

    const removeFile = useCallback((index) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }, [setFiles])

    const formatFileSize = useCallback((bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }, [])

    return (
        <dl className='fileAttachment__container'>
            <dt className='fileAttachment__link'>
                <label>Прикрепить файлы
                    <input type="file" multiple onChange={handleFileSelect} hidden />
                </label>
            </dt>
            {files && files.map((file, i) => (
                <dd key={i} className='fileAttachment__file'>
                    <Button
                        className='fileAttachment__remove'
                        onClick={() => removeFile(i)}
                    >
                        ✖
                    </Button>
                    {file.name} ({formatFileSize(file.size)})
                </dd>
            ))}
        </dl>
    )
}

export default FileAttachmentField