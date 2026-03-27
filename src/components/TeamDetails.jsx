import { useEffect, useState } from 'react'
import Section from './Section'
import { useParams } from 'react-router'
import teamsAPI from '../api/teamsAPI'
import AuthService from '../service/AuthService'
import Spinner from './Spinner'

const TeamDetails = () => {
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

    if (isLoadingTeam) {
        return (
            <Section>
                <Spinner />
            </Section>
        )
    }

    const { userProfileId } = AuthService.getUserInfo()
    const currentUserPair = team.userRolePairs.find(pair => pair.user.id === userProfileId)
    return (
        <Section>
            <div className="h1">{team.name}</div>
            <div className="team-details">
                <p>{`${currentUserPair.user.firstName} ${currentUserPair.user.secondName}`}</p>
                <p>{currentUserPair.role.name}</p>
            </div>
        </Section>
    )
}

export default TeamDetails