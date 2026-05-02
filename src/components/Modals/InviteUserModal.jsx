import { memo, useCallback, useContext, useState } from 'react'
import { TeamContext } from '../../context/Team/TeamContext'
import inviteAPI from '../../api/inviteAPI'
import SelectField from '../SelectField'
import Modal from '../Modal'
import { showError } from '../../utils/errorHandler'

const InviteUserModal = ({ isOpen, onClose }) => {
    const { team, roleOptions } = useContext(TeamContext)
    const [isWaiting, setIsWaiting] = useState(false)
    const [selectedRole, setSelectedRole] = useState(roleOptions[0])

    const handleInviteUser = useCallback(async () => {
        setIsWaiting(true)
        const inviteToken = await inviteAPI.getToken({
            TeamId: team.id,
            RoleId: selectedRole.value
        })
        await navigator.clipboard.writeText(`${window.location.origin}/invite?token=${inviteToken}`)
        setIsWaiting(false)
        showError('Ссылка скопирована')
        return true
    }, [selectedRole.value, team.id])

    const handleClose = useCallback(
        () => onClose(), [onClose])

    return (
        <Modal
            title='Приглашение пользователя'
            isOpen={isOpen}
            onClose={handleClose}
            actionTitle={'Пригласить'}
            onAction={handleInviteUser}
            isDisabled={isWaiting}
        >
            <SelectField
                id='selectRole'
                value={selectedRole}
                options={roleOptions}
                onChange={setSelectedRole}
                placeholder='Роль'
                isForEditUserRolesSection
            />
        </Modal>
    )
}

export default memo(InviteUserModal)