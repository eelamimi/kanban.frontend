import { useContext } from 'react'
import Section from './Section'
import AuthService from '../service/AuthService'
import Spinner from './Spinner'
import Button from './Button'
import List from './List'
import Span from './Span'
import { TeamContext } from '../context/Team/TeamContext'

const TeamDetails = () => {
    const {
        isLoadingTeam,
        team,
    } = useContext(TeamContext)

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