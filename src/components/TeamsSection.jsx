import { useContext } from 'react'
import { UserInfoContext } from '../context/UserInfo/UserInfoContext'
import Section from './Section'
import Button from './Button'
import TeamsList from './TeamsSection/TeamsList'
import Spinner from './Spinner'

const TeamsSection = () => {
    const {
        teams,
        isLoadingTeams
    } = useContext(UserInfoContext)
    return (
        <Section>
            <div className='teamsSection__team-header'>
                <div className="h1">Команды</div>
                <Button className='teamsSection__team-add-button'>Создать команду</Button>
            </div>
            {isLoadingTeams ? (
                <Spinner />
            ) : (
                <TeamsList teams={teams} />
            )}
        </Section>
    )
}

export default TeamsSection