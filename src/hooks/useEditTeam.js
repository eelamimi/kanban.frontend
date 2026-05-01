import { useCallback, useState } from 'react';
import teamsAPI from '../api/teamsAPI';
import { showError } from '../utils/errorHandler';
import { isBlank } from '../utils/fieldValidation';

export const useEditTeam = () => {
    const [teamName, setTeamName] = useState('')
    const [errorTeamName, setErrorTeamName] = useState('')
    const [isWaiting, setIsWaiting] = useState(false)

    const onTeamNameInput = useCallback(({ target }) => {
        const { value } = target
        setTeamName(value)
        setErrorTeamName(isBlank(value) ? 'Название обязательно' : '')
    }, [])

    const validateValues = useCallback(() => {
        if (isBlank(teamName)) {
            setErrorTeamName('Название обязательно')
            return false
        }
        return true
    }, [teamName])

    const updateTeam = useCallback(async (team, setTeam) => {
        if (!validateValues())
            return false

        try {
            setIsWaiting(true)
            if (team.name !== teamName) {
                await teamsAPI.update({
                    TeamId: team.id,
                    Name: teamName,
                })
                setTeam(prev => ({
                    ...prev,
                    name: teamName
                }))
            }
            return true
        }
        catch (error) {
            showError(error.message || 'Ошибка изменения команды')
            return false
        }
        finally {
            setIsWaiting(false)
        }
    }, [validateValues, teamName])

    const resetValues = useCallback((team) => {
        setTeamName(team.name)
        setErrorTeamName('')
    }, [])

    return {
        teamName,
        onTeamNameInput,
        errorTeamName,
        isWaiting,
        updateTeam,
        resetValues,
    }
}
