import { memo, useCallback, useRef } from 'react'
import Modal from '../Modal'
import EditTeamSection from '../EditTeamModalSections/EditTeamSection'
import EditRolesSection from '../EditTeamModalSections/EditRolesSection'
import EditUserRolesSection from '../EditTeamModalSections/EditUserRolesSection'

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
            <EditRolesSection />
            <EditUserRolesSection />
        </Modal>
    )
}

export default memo(EditTeamModal)