import { useRef, useEffect, useState, useCallback, memo, forwardRef } from 'react'
import Button from './Button'

const Modal = memo(forwardRef(function Modal({ isOpen, onAction, actionTitle, onClose, isDisabled = false, title, children }, ref) {
    const [isOverlayClick, setIsOverlayClick] = useState(false)
    const internalDialogRef = useRef(null)
    const dialogRef = ref || internalDialogRef

    const handleSubmit = useCallback(async () => {
        const canClose = await onAction()
        if (canClose) {
            dialogRef.current.close()
        }
    }, [onAction, dialogRef])

    const handleOverlayClick = useCallback((e) => {
        if (e.target === dialogRef.current) {
            setIsOverlayClick(true)
            onClose()
        }
    }, [onClose, dialogRef])

    useEffect(() => {
        const dialog = dialogRef.current

        if (isOpen && !dialog.open) {
            dialog.showModal()
        } else if (!isOpen && dialog.open) {
            dialog.close()
        }
    }, [isOpen, dialogRef])

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
    }, [onClose, dialogRef, isOverlayClick])

    return (
        <dialog
            ref={dialogRef}
            onClick={handleOverlayClick}
        >
            <div className='dialogContainer'>
                <div className='h1' style={{ marginBottom: '25px' }}>{title}</div>
                {children}
                <form className='buttons' method='dialog'>
                    {onAction &&
                        <Button
                            className='left'
                            onClick={handleSubmit}
                            isDisabled={isDisabled}
                        >
                            {actionTitle}
                        </Button>
                    }
                    <Button
                        className={`close ${onAction ? `` : `left`}`}
                        type='close'
                    >
                        Закрыть
                    </Button>
                </form>
            </div>
        </dialog>
    )
}))

export default Modal
