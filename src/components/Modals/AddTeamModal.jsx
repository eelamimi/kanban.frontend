import { useCallback, memo, useContext, useState } from 'react'
import { UserInfoContext } from '../../context/UserInfo/UserInfoContext'
import Modal from '../Modal'
import Field from '../Field'
import { showError } from '../../utils/errorHandler'
import teamsAPI from '../../api/teamsAPI'

function AddTeamModal({ isOpen, onClose }) {
    const { setTeams } = useContext(UserInfoContext)
    const [title, setTitle] = useState('')
    const [errorTitle, setErrorTitle] = useState('')
    const [isWaiting, setIsWaiting] = useState(false)

    const onTitleInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setTitle(value)
        setErrorTitle(hasOnlySpaces ? 'Название обязательно' : '')
    }, [])

    const addTeam = useCallback(async () => {
        const clearValue = title.trim()
        const hasOnlySpaces = title.length > 0 && clearValue.length === 0
        if (hasOnlySpaces || title.length === 0) {
            setErrorTitle('Название обязательно')
            return false
        }

        setIsWaiting(true)
        try {
            const response = await teamsAPI.addTeam({ Name: title })
            setTeams(prev => [...prev, response])
            return true
        }
        catch {
            showError('Ошибка добавления команды')
            return false
        }
        finally {
            setIsWaiting(false)
        }
    }, [title, setTeams])

    const handleClose = useCallback(() => {
        onClose()
        setTitle('')
        setErrorTitle('')
    }, [onClose])

    return (
        <Modal
            isOpen={isOpen}
            title={'Добавление команды'}
            actionTitle={'Добавить'}
            onAction={addTeam}
            onClose={handleClose}
            isDisabled={isWaiting}
        >
            <Field
                id='teamTitle'
                inputClassName='full-width'
                type='text'
                label='Название'
                value={title}
                onInput={onTitleInput}
                error={errorTitle}
            />
        </Modal>
    )
}

export default memo(AddTeamModal)