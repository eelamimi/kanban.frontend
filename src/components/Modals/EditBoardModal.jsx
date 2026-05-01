import { memo, useCallback } from 'react'
import Modal from '../Modal'
import EditProjectSection from '../EditBoardModalSections/EditProjectSection'
import EditColumnRelationsSection from '../EditBoardModalSections/EditColumnRelationsSection'
import AddColumnSection from '../EditBoardModalSections/AddColumnSection'
import EditColumnPositionsSection from '../EditBoardModalSections/EditColumnPositionsSection'

function EditBoardModal({ isOpen, onClose }) {
    const handleClose = useCallback(
        () => onClose(), [onClose])

    return (
        <Modal
            isOpen={isOpen}
            title={'Редактирование доски'}
            actionTitle={'Обновить'}
            onClose={handleClose}
        >
            <EditProjectSection onClose={handleClose} />
            <AddColumnSection onClose={handleClose} />
            <EditColumnPositionsSection />
            <EditColumnRelationsSection />
        </Modal>
    )
}

export default memo(EditBoardModal)
