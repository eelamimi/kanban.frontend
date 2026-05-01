import { memo, useCallback, useContext, useState } from 'react'
import { TeamContext } from '../../context/Team/TeamContext'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { showError } from '../../utils/errorHandler'
import ModalSection from '../ModalSection'
import Section from '../Section'
import Button from '../Button'
import Field from '../Field'
import rolesAPI from '../../api/rolesAPI'

const Role = ({ role }) => {
    const { team, setTeam } = useContext(TeamContext)
    const [isEditingRoleName, setIsEditingNameRole] = useState(false)
    const [isWaitingEditRoleName, setIsWaitingEditRoleName] = useState(false)
    const [isWaitingDeleteRole, setIsWaitingDeleteRole] = useState(false)
    const [roleName, setRoleName] = useState(role.name)
    const [errorRoleName, setErrorRoleName] = useState('')

    const onRoleNameInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setRoleName(value)
        setErrorRoleName(hasOnlySpaces || value.length === 0 ? 'Название обязательно' : '')
    }, [])

    const validateValues = useCallback(() => {
        let isValid = true

        let clearValue = roleName.trim()
        let hasOnlySpaces = roleName.length > 0 && clearValue.length === 0
        if (hasOnlySpaces || roleName.length === 0) {
            setErrorRoleName('Название обязательно')
            isValid = false
        }

        return isValid
    }, [roleName])

    const handleEditRoleButton = useCallback(async () => {
        if (isEditingRoleName) {
            if (!validateValues() || roleName === role.name) {
                setIsEditingNameRole(!isEditingRoleName)
                return
            }

            const previousRoleName = role.name

            setTeam(prev => ({
                ...prev,
                roles: prev.roles.map(r =>
                    r.id === role.id ? { ...r, name: roleName } : r
                )
            }))

            setIsWaitingEditRoleName(true)
            try {
                const response = await rolesAPI.update({
                    RoleId: role.id,
                    Name: roleName
                })

                setTeam(prev => ({
                    ...prev,
                    userRolePairs: response.userRolePairs
                }))
            } catch (err) {
                setTeam(prev => ({
                    ...prev,
                    roles: prev.roles.map(r =>
                        r.id === role.id ? { ...r, name: previousRoleName } : r
                    )
                }))
                showError(err.message || 'Ошибка обновления роли')
            } finally {
                setIsWaitingEditRoleName(false)
            }
        }

        setIsEditingNameRole(!isEditingRoleName)
    }, [isEditingRoleName, validateValues, roleName, role.name, role.id, setTeam])

    const handleDeleteRoleButton = useCallback(async () => {
        try {
            setIsWaitingDeleteRole(true)
            await rolesAPI.delete(role.id)
            setTeam(prev => ({
                ...prev,
                roles: prev.roles.filter(r => r.id !== role.id)
            }))
        } catch (err) {
            showError(err.message || 'Ошибка удаления роли')
        } finally {
            setIsWaitingDeleteRole(false)
        }
    }, [role.id, setTeam])

    return (
        <div className='row' style={{ gap: '6px' }}>
            <Section className={`column-position ${isEditingRoleName ? `editing-column-name` : ``}`}>
                {isEditingRoleName
                    ? <Field
                        id='columnNameEdit'
                        fieldClassName='column-name-edit'
                        type='text'
                        value={roleName}
                        onInput={onRoleNameInput}
                        error={errorRoleName}
                    />
                    : role.name
                }
            </Section>
            <Button
                className='column-button-action'
                onClick={handleEditRoleButton}
                isDisabled={isWaitingEditRoleName}
            >
                {isEditingRoleName
                    ? <FontAwesomeIcon icon={faCheck} />
                    : <FontAwesomeIcon icon={faPenToSquare} />
                }
            </Button>
            <Button
                className='close column-button-action'
                onClick={handleDeleteRoleButton}
                isDisabled={isWaitingDeleteRole || team.roles.length < 2}
            >
                <FontAwesomeIcon icon={faX} />
            </Button>
        </div>
    )
}

const AddRole = () => {
    const { team, setTeam } = useContext(TeamContext)
    const [isWaitingAddRoleName, setIsWaitingAddRoleName] = useState(false)
    const [roleName, setRoleName] = useState('')
    const [errorRoleName, setErrorRoleName] = useState('')

    const onRoleNameInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setRoleName(value)
        setErrorRoleName(hasOnlySpaces ? 'Название обязательно' : '')
    }, [])

    const validateValues = useCallback(() => {
        let isValid = true

        let clearValue = roleName.trim()
        let hasOnlySpaces = roleName.length > 0 && clearValue.length === 0
        if (hasOnlySpaces || roleName.length === 0) {
            setErrorRoleName('Название обязательно')
            isValid = false
        }

        return isValid
    }, [roleName])

    const handleAddRoleButton = useCallback(async () => {
        if (!validateValues())
            return

        setIsWaitingAddRoleName(true)
        try {
            const response = await rolesAPI.add({
                TeamId: team.id,
                Name: roleName
            })

            setTeam(prev => ({
                ...prev,
                roles: [...prev.roles, response]
            }))

            setRoleName('')
            setErrorRoleName('')
        } catch (err) {
            showError(err.message || 'Ошибка добавления роли')
        } finally {
            setIsWaitingAddRoleName(false)
        }
    }, [roleName, setTeam, team.id, validateValues])

    return (
        <div className='row' style={{ gap: '6px' }}>
            <Section className='column-position editing-column-name'>
                <Field
                    id='columnNameEdit'
                    fieldClassName='column-name-edit'
                    type='text'
                    value={roleName}
                    onInput={onRoleNameInput}
                    error={errorRoleName}
                />
            </Section>
            <Button
                className='column-button-action double'
                onClick={handleAddRoleButton}
                isDisabled={isWaitingAddRoleName}
            >
                Добавить&nbsp;<FontAwesomeIcon icon={faCheck} />
            </Button>
        </div>
    )
}

const EditRolesSection = () => {
    const { team } = useContext(TeamContext)

    return (
        <ModalSection title='Редактирование ролей'>
            <div className='column' style={{ gap: '6px' }}>
                {team.roles.map((role) => (
                    <Role
                        key={role.id}
                        role={role}
                    />
                ))}
                <AddRole />
            </div>
        </ModalSection>
    )
}

export default memo(EditRolesSection)