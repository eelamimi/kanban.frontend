import { useParams } from 'react-router'
import { useEffect, useMemo, useState } from 'react'
import { TeamContext } from './TeamContext'
import AuthService from '../../service/AuthService'
import teamsAPI from '../../api/teamsAPI'

const TeamProvider = ({ children }) => {
    const { teamId } = useParams()
    const [isLoadingTeam, setIsLoadingTeam] = useState(true)
    const [team, setTeam] = useState(null)
    const roleOptions = useMemo(() => {
        if (!team?.roles) return []
        return team.roles.map((r) => ({
            value: r.id,
            label: r.name
        }))
    }, [team.roles])

    useEffect(() => {
        async function fetchTeam() {
            try {
                const response = await teamsAPI.getTeam(teamId)
                setTeam(response)
                setIsLoadingTeam(false)
            } catch (error) {
                console.error('Error fetching team:', error)
            }
        }

        fetchTeam()
    }, [teamId])

    return (
        <TeamContext.Provider
            value={{
                isLoadingTeam,
                team,
                setTeam,
                roleOptions
            }}
        >
            {children}
        </TeamContext.Provider>
    )
}

export default TeamProvider