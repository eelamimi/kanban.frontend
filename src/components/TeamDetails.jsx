import { useEffect, useState } from 'react'
import Section from './Section'
import { useParams } from 'react-router'
import teamsAPI from '../api/teamsAPI'
import AuthService from '../service/AuthService'
import Spinner from './Spinner'
import Button from './Button'
import List from './List'
import Span from './Span'

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
            <>
                <Section>
                    <Spinner />
                </Section>
                <Section>
                    <Spinner />
                </Section>
                <Section>
                    <Spinner />
                </Section>
            </>
        )
    }

    const { userProfileId } = AuthService.getUserInfo()
    const currentUserPair = team.userRolePairs.find(pair => pair.user.id === userProfileId)

    return (
        <>
            <Section>
                <div className='subsection'>
                    <div className='h1'>{team.name}</div>
                    <Button className='left'>Редактировать</Button>
                </div>
                <Span
                    label={`${currentUserPair.role.name}:`}
                    value={`${currentUserPair.user.firstName} ${currentUserPair.user.secondName}`}
                />
            </Section>
            <Section>
                <div className='subsection'>
                    <div className='h1'>Проекты</div>
                    <Button className='left'>Добавить</Button>
                </div>
                <List
                    items={team.projects}
                    toLink={(project) => { return `/projects/${project.id}` }}
                    itemName={(project) => { return project.name }}
                    itemSubName={(project) => { return project.description }}
                />
            </Section>
            <Section>
                <div className='subsection'>
                    <div className='h1'>Пользователи</div>
                    <Button className='left'>Пригласить</Button>
                </div>
                <List
                    items={team.userRolePairs}
                    getKey={(pair) => { return pair.user.id }}
                    toLink={(pair) => { return `/profile?userId=${pair.user.id}` }}
                    itemName={(pair) => { return `${pair.user.firstName} ${pair.user.secondName}` }}
                    itemSubName={(pair) => { return pair.role.name }}
                />
            </Section>
        </>
    )
}

export default TeamDetails