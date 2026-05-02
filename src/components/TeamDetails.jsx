import { useContext, useState } from 'react'
import Section from './Section'
import AuthService from '../service/AuthService'
import Spinner from './Spinner'
import Button from './Button'
import List from './List'
import Span from './Span'
import { TeamContext } from '../context/Team/TeamContext'
import AddProjectModal from './Modals/AddProjectModal'
import EditTeamModal from './Modals/EditTeamModal'
import InviteUserModal from './Modals/InviteUserModal'

const TeamDetails = () => {
    const {
        isLoadingTeam,
        team,
    } = useContext(TeamContext)
    const { userProfileId } = AuthService.getUserInfo()
    const [isAddProject, setIsAddProject] = useState(false)
    const [isEditTeamOpen, setIsEditTeamOpen] = useState(false)
    const [isInviteUser, setIsInviteUser] = useState(false)

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

    const currentUserPair = team.userRolePairs.find(pair => pair.user.id === userProfileId)

    return (
        <>
            <Section>
                <div className='subsection'>
                    <div className='h1'>{team.name}</div>
                    <Button
                        className='left'
                        onClick={() => setIsEditTeamOpen(true)}
                    >
                        Редактировать</Button>
                    <EditTeamModal
                        isOpen={isEditTeamOpen}
                        onClose={() => setIsEditTeamOpen(false)}
                    />
                </div>
                <Span
                    label={`${currentUserPair.role.name}:`}
                    value={`${currentUserPair.user.firstName} ${currentUserPair.user.secondName}`}
                />
            </Section>
            <Section>
                <div className='subsection'>
                    <div className='h1'>Проекты</div>
                    <Button
                        className='left'
                        onClick={() => setIsAddProject(true)}
                    >
                        Добавить
                    </Button>
                    <AddProjectModal
                        isOpen={isAddProject}
                        onClose={() => setIsAddProject(false)}
                    />
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
                    <Button
                        className='left'
                        onClick={() => setIsInviteUser(true)}
                    >
                        Пригласить
                    </Button>
                    <InviteUserModal
                        isOpen={isInviteUser}
                        onClose={() => setIsInviteUser(false)}
                    />
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