/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import teamsAPI from '../../api/teamsAPI'

export const TeamContext = createContext({})

const TeamProvider = ({ children }) => {
    const { teamId } = useParams()
    const [isLoadingTeam, setIsLoadingTeam] = useState(true)
    const [team, setTeam] = useState(null)

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
                setTeam
            }}
        >
            {children}
        </TeamContext.Provider>
    )
}

export default TeamProvider
