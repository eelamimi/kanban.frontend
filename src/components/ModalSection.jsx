import { useCallback } from 'react'
import Button from './Button'

const ModalSection = ({ title, children, isDisabled = false, onClick, buttonTitle, onClose }) => {
    const handleOnClick = useCallback(async () => {
        const canClose = await onClick()
        if (onClose && canClose) {
            onClose()
        }
    }, [onClose, onClick])

    return (
        <div className='modal-section'>
            {title && <div className='h1' style={{ marginBottom: '25px' }}>{title}</div>}
            {children}
            {onClick &&
                <div style={{ display: 'flex' }}>
                    <Button
                        className='left'
                        onClick={handleOnClick}
                        isDisabled={isDisabled}
                    >
                        {buttonTitle}
                    </Button>
                </div>
            }
        </div>
    )
}

export default ModalSection
