import { memo, useCallback, useContext, useEffect } from 'react'
import { TeamContext } from '../../context/Team/TeamContext'
import { useEditTeam } from '../../hooks/useEditTeam'
import ModalSection from '../ModalSection'
import Field from '../Field'

const EditTeamSection = ({ onClose }) => {
    const { team, setTeam } = useContext(TeamContext)
    const {
        teamName,
        onTeamNameInput,
        errorTeamName,
        isWaiting,
        updateTeam,
        resetValues,
    } = useEditTeam()

    const handleUpdateTeam = useCallback(async () => {
        return await updateTeam(team, setTeam)
    }, [setTeam, team, updateTeam])

    useEffect(() => {
        if (!team)
            return
        resetValues(team)
    }, [resetValues, team])

    return (
        <ModalSection
            onClick={handleUpdateTeam}
            isDisabled={isWaiting}
            buttonTitle='Редактировать'
            onClose={onClose}
        >
            <Field
                id='editTeamName'
                fieldClassName='full-width'
                inputClassName='full-width'
                label='Название'
                type='text'
                value={teamName}
                onInput={onTeamNameInput}
                error={errorTeamName}
            />
        </ModalSection>
    )
}

export default memo(EditTeamSection)
