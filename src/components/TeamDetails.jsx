import { useEffect, useState } from 'react'
import Section from './Section'
import { useParams } from 'react-router'
import teamsAPI from '../api/teamsAPI'
import AuthService from '../service/AuthService'
import Spinner from './Spinner'
import Button from './Button'
import List from './List'

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
                <div className='teamDetails__header'>
                    <div className='h1'>{team.name}</div>
                    <Button className='teamDetails__team-edit-button'>Редактировать команду</Button>
                </div>
                <div className='teamDetails__field'>
                    <div className='teamDetails__label'>{`${currentUserPair.role.name}:`}</div>
                    <span>{`${currentUserPair.user.firstName} ${currentUserPair.user.secondName}`}</span>
                </div>
            </Section>
            <Section>
                <div className='teamDetails__header'>
                    <div className='h1'>Проекты</div>
                    <Button className='teamDetails__team-edit-button'>Добавить проект</Button>
                </div>
                <List
                    items={team.projects}
                    toLink={(project) => { return `/projects/${project.id}` }}
                    itemName={(project) => { return project.name }}
                    itemSubName={(project) => { return project.description }}
                />
            </Section>
            <Section>
                <div className='teamDetails__header'>
                    <div className='h1'>Пользователи</div>
                    <Button className='teamDetails__team-edit-button'>Пригласить</Button>
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