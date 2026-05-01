import { useCallback, useState } from 'react';
import teamsAPI from '../api/teamsAPI';
import { showError } from '../utils/errorHandler';

export const useEditTeam = () => {
    const [teamName, setTeamName] = useState('')
    const [errorTeamName, setErrorTeamName] = useState('')
    const [isWaiting, setIsWaiting] = useState(false)

    const onTeamNameInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setTeamName(value)
        setErrorTeamName(hasOnlySpaces || value.length === 0 ? 'Название обязательно' : '')
    }, [])

    const validateValues = useCallback(() => {
        let isValid = true

        let clearValue = teamName.trim()
        let hasOnlySpaces = teamName.length > 0 && clearValue.length === 0
        if (hasOnlySpaces || teamName.length === 0) {
            setErrorTeamName('Название обязательно')
            isValid = false
        }

        return isValid
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