import { memo, useCallback } from 'react'
import Button from './Button'
import { formatFileSize } from '../utils/fileFormatter'

function FileAttachmentField({ className, files, setFiles }) {
    const handleFileSelect = useCallback((event) => {
        const files = Array.from(event.target.files)
        setFiles(prev => [...prev, ...files])
    }, [setFiles])

    const removeFile = useCallback((index) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }, [setFiles])

    return (
        <dl className={`fileAttachment__container ${className}`}>
            <dt className='fileAttachment__link'>
                <label>Прикрепить файлы
                    <input type='file' multiple onChange={handleFileSelect} hidden />
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

export default memo(FileAttachmentField)