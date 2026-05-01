import { memo, useCallback, useContext, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TeamContext } from '../../context/Team/TeamContext'
import { faX } from '@fortawesome/free-solid-svg-icons'
import ModalSection from '../ModalSection'
import SelectField from '../SelectField'
import Section from '../Section'
import Button from '../Button'
import rolesAPI from '../../api/rolesAPI'
import { showError } from '../../utils/errorHandler'
import AuthService from '../../service/AuthService'
import teamsAPI from '../../api/teamsAPI'

const Pair = ({ pair, options }) => {
    const { team, setTeam } = useContext(TeamContext)
    const fullName = `${pair.user.firstName} ${pair.user.secondName}`
    const [role, setRole] = useState({ value: pair.role.id, label: pair.role.name })
    const [isWaitingDeleteUser, setIsWaitingDeleteUser] = useState(false)

    const onChange = useCallback(async (selected) => {
        const previousRole = { value: pair.role.id, label: pair.role.name }

        setRole(selected)

        setTeam(prev => ({
            ...prev,
            userRolePairs: prev.userRolePairs.map(p =>
                p.user.id === pair.user.id
                    ? { ...p, role: { id: selected.value, name: selected.label } }
                    : p
            )
        }))

        try {
            await rolesAPI.updateUserRole({
                UserProfileId: pair.user.id,
                RoleId: selected.value
            })
        } catch (err) {
            setRole(previousRole)
            setTeam(prev => ({
                ...prev,
                userRolePairs: prev.userRolePairs.map(p =>
                    p.user.id === pair.user.id
                        ? { ...p, role: { id: previousRole.value, name: previousRole.label } }
                        : p
                )
            }))
            showError(err?.message || 'Ошибка изменения роли пользователя')
        }
    }, [pair, setTeam])

    const handleDeleteUser = useCallback(async () => {
        const prevPairs = team.userRolePairs

        setTeam(prev => ({
            ...prev,
            userRolePairs: prev.userRolePairs.filter(p =>
                p.user.id !== pair.user.id)
        }))

        try {
            setIsWaitingDeleteUser(true)
            await teamsAPI.deleteUser(team.id, pair.user.id)
        } catch (err) {
            setTeam(prev => ({
                ...prev,
                userRolePairs: prevPairs
            }))
            showError(err?.message || 'Ошибка исключения пользователя')
        } finally {
            setIsWaitingDeleteUser(false)
        }
    }, [pair.user.id, setTeam, team.id, team.userRolePairs])

    return (
        <div className='row' style={{ gap: '6px' }}>
            <Section className='column-position'>
                {fullName}
            </Section>
            <Section className='column-position no-margin-bottom'>
                <SelectField
                    id={`${pair.user.id}selectRole`}
                    fieldClassName='no-margin-bottom'
                    value={role}
                    options={options}
                    onChange={onChange}
                    placeholder='Роль'
                    isForEditUserRolesSection
                />
            </Section>
            <Button
                className='close column-button-action double'
                onClick={handleDeleteUser}
                isDisabled={isWaitingDeleteUser ||
                    pair.user.id === AuthService.getUserInfo().userProfileId}
            >
                Исключить&nbsp;<FontAwesomeIcon icon={faX} />
            </Button>
        </div>
    )
}

const EditUserRolesSection = () => {
    const { team } = useContext(TeamContext)
    const roleOptions = useMemo(() => {
        if (!team?.roles) return []
        return team.roles.map((r) => ({
            value: r.id,
            label: r.name
        }))
    }, [team.roles])

    return (
        <ModalSection title='Редактирование пользователей'>
            <div className='column' style={{ gap: '6px' }}>
                {team.userRolePairs.map((pair) => (
                    <Pair
                        key={`${pair.user.id}=${pair.role.name}`}
                        pair={pair}
                        options={roleOptions}
                    />
                ))}
            </div>
        </ModalSection>
    )
}

export default memo(EditUserRolesSection)