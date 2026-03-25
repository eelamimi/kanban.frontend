import { useContext } from 'react'
import { UserInfoContext } from '../context/UserInfo/UserInfoContext'
import { Link } from 'react-router'
import Section from './Section'
import Button from './Button'

const TeamsSection = () => {
    const {
        teams,
        isLoadingTeams
    } = useContext(UserInfoContext)

    return (
        <Section>
            <div className='teamsSection__team-header'>
                <div className="teamsSection__team-h1">Команды</div>
                <Button className='teamsSection__team-add-button'>Создать команду</Button>
            </div>
            <div className="teamsSection__teams-list">
                {teams && teams.map((team) => (
                    <div key={team.id} className="teamsSection__team-item">
                        <Link
                            className="teamsSection__team-name"
                            to={`/teams/${team.id}`}
                        >
                            {team.name}
                        </Link>
                        <div className="teamsSection__team-role">{team.role}</div>
                    </div>
                ))}
            </div>
        </Section>
    )
}

export default TeamsSection