import { memo, useCallback, useRef } from 'react'
import Modal from '../Modal'
import EditProjectSection from '../EditBoardModalSections/EditProjectSection'
import EditColumnRelationsSection from '../EditBoardModalSections/EditColumnRelationsSection'
import AddColumnSection from '../EditBoardModalSections/AddColumnSection'
import EditColumnPositionsSection from '../EditBoardModalSections/EditColumnPositionsSection'

function EditBoardModal({ isOpen, onClose }) {
    const dialogRef = useRef(null)

    const handleClose = useCallback(
        () => onClose(), [onClose])

    return (
        <Modal
            isOpen={isOpen}
            title={'Редактирование доски'}
            actionTitle={'Обновить'}
            onClose={handleClose}
            ref={dialogRef}
        >
            <EditProjectSection ref={dialogRef} />
            <AddColumnSection ref={dialogRef} />
            <EditColumnPositionsSection />
            <EditColumnRelationsSection />
        </Modal>
    )
}

export default memo(EditBoardModal)