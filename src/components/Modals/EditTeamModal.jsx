import { memo, useCallback, useRef } from 'react'
import Modal from '../Modal'

const EditTeamModal = ({ isOpen, onClose }) => {
    const dialogRef = useRef(null)

    const handleClose = useCallback(
        () => onClose(), [onClose])

    return (
        <Modal
            isOpen={isOpen}
            title={'Редактирование команды'}
            onClose={handleClose}
            isDisabled={dialogRef}
        >
        </Modal>
    )
}

export default memo(EditTeamModal)