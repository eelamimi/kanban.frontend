import { useRef, useEffect, useState } from 'react'
import Button from './Button'

function Modal({ isOpen, onAction, actionTitle, onClose, title, children }) {
    const [isOverlayClick, setIsOverlayClick] = useState(false)
    const dialogRef = useRef(null)

    const handleSubmit = async () => {
        await onAction()
        dialogRef.current.close()
    }

    const handleOverlayClick = (e) => {
        if (e.target === dialogRef.current) {
            setIsOverlayClick(true)
            onClose()
        }
    }

    useEffect(() => {
        const dialog = dialogRef.current

        if (isOpen && !dialog.open) {
            dialog.showModal()
        } else if (!isOpen && dialog.open) {
            dialog.close()
        }
    }, [isOpen])

    useEffect(() => {
        const dialog = dialogRef.current

        const handleClose = () => {
            if (!isOverlayClick) {
                if (onClose) {
                    onClose()
                }
            }
            setIsOverlayClick(false)
        }

        dialog.addEventListener('close', handleClose)
        return () => dialog.removeEventListener('close', handleClose)
    }, [onClose, isOverlayClick])

    return (
        <dialog
            ref={dialogRef}
            onClick={handleOverlayClick}
        >
            <div className='dialogContainer'>
                <div className='h1'>{title}</div>
                {children}
                <form className='buttons' method='dialog'>
                    <Button
                        className='left'
                        onClick={handleSubmit}
                    >
                        {actionTitle}
                    </Button>
                    <Button
                        className='close'
                        type='close'>
                        Закрыть
                    </Button>
                </form>
            </div>
        </dialog>
    )
}

export default Modal