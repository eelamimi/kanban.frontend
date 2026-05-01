import { memo, useContext, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TeamContext } from '../../context/Team/TeamContext'
import { faX } from '@fortawesome/free-solid-svg-icons'
import ModalSection from '../ModalSection'
import SelectField from '../SelectField'
import Section from '../Section'
import Button from '../Button'

const Pair = ({ pair, options }) => {
    const fullName = `${pair.user.firstName} ${pair.user.secondName}`
    const [role, setRole] = useState({ value: pair.role.id, label: pair.role.name })
    console.log(role);

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
                    onChange={setRole}
                    placeholder='Роль'
                    isForEditUserRolesSection
                />
            </Section>
            <Button
                className='close column-button-action double'
            // onClick={handleDeleteRoleButton}
            // isDisabled={isWaitingDeleteRole || team.roles.length < 2}
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