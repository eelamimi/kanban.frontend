import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { TeamContext } from './TeamContext'
import AuthService from '../../service/AuthService'
import teamsAPI from '../../api/teamsAPI'

const TeamProvider = ({ children }) => {
    const { teamId } = useParams()
    const [isLoadingTeam, setIsLoadingTeam] = useState(true)
    const [team, setTeam] = useState(null)

    useEffect(() => {
        async function fetchTeam() {
            try {
                const response = await teamsAPI.getTeam(teamId)
                setTeam(response)
            } catch (error) {
                console.error('Error fetching team:', error)
            } finally {
                setIsLoadingTeam(false)
            }
        }

        fetchTeam()
    }, [teamId])

    return (
        <TeamContext.Provider
            value={{
                isLoadingTeam,
                team,
                setTeam
            }}
        >
            {children}
        </TeamContext.Provider>
    )
}

export default TeamProvider