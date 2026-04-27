import { memo, useCallback, useState } from 'react'
import Modal from '../Modal'

const EditIssueModal = ({ isOpen, onClose }) => {
    const [isWaiting, setIsWaiting] = useState(false)

    const editIssue = useCallback(async () => {
        setIsWaiting(true)
        setIsWaiting(false)
    }, [])

    const handleClose = useCallback(() => {
        onClose()
    }, [onClose])

    return (
        <Modal
            isOpen={isOpen}
            title={'Изменить проблему'}
            actionTitle={'Изменить'}
            onAction={editIssue}
            onClose={handleClose}
            isDisabled={isWaiting}
        >
        </Modal>
    )
}

export default memo(EditIssueModal)