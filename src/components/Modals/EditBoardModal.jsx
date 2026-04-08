import { memo, useCallback } from 'react'
import Modal from '../Modal'

function EditBoardModal({ isOpen, onClose }) {
    const handleClose = useCallback(() => {
        onClose()
    }, [onClose])

    return (
        <Modal
            isOpen={isOpen}
            title={'Редактирование доски'}
            actionTitle={'Обновить'}
            onAction={() => true}
            onClose={handleClose}
        >
        </Modal>
    )
}

export default memo(EditBoardModal)