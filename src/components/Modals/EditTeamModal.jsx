import { memo, useCallback } from 'react'
import Modal from '../Modal'
import EditTeamSection from '../EditTeamModalSections/EditTeamSection'
import EditRolesSection from '../EditTeamModalSections/EditRolesSection'
import EditUserRolesSection from '../EditTeamModalSections/EditUserRolesSection'

const EditTeamModal = ({ isOpen, onClose }) => {
    const handleClose = useCallback(
        () => onClose(), [onClose])

    return (
        <Modal
            isOpen={isOpen}
            title={'Редактирование команды'}
            onClose={handleClose}
        >
            <EditTeamSection onClose={handleClose} />
            <EditRolesSection />
            <EditUserRolesSection />
        </Modal>
    )
}

export default memo(EditTeamModal)
