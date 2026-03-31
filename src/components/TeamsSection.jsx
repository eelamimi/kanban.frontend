import { useContext } from 'react'
import { UserInfoContext } from '../context/UserInfo/UserInfoContext'
import Section from './Section'
import Button from './Button'
import Spinner from './Spinner'
import List from './List'

const TeamsSection = () => {
    const {
        teams,
        isLoadingTeams
    } = useContext(UserInfoContext)

    return (
        <Section>
            {isLoadingTeams ? (
                <Spinner />
            ) : (
                <>
                    <div className='teamsSection__team-header'>
                        <div className="h1">Команды</div>
                        <Button className='teamsSection__team-add-button'>Создать команду</Button>
                    </div>
                    <List
                        items={teams}
                        toLink={(t) => { return `/teams/${t.id}` }}
                        itemName={(t) => { return t.name }}
                        itemSubName={(t) => { return t.role.name }}
                    />
                </>
            )}
        </Section>
    )
}

export default TeamsSection