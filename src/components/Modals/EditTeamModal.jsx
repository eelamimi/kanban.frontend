import { memo, useCallback, useRef } from 'react'
import Modal from '../Modal'
import EditTeamSection from '../EditTeamModalSections/EditTeamSection'

const EditTeamModal = ({ isOpen, onClose }) => {
    const dialogRef = useRef(null)

    const handleClose = useCallback(
        () => onClose(), [onClose])

    return (
        <Modal
            isOpen={isOpen}
            title={'Редактирование команды'}
            onClose={handleClose}
            ref={dialogRef}
        >
            <EditTeamSection ref={dialogRef} />
        </Modal>
    )
}

export default memo(EditTeamModal)