import { useContext, useState } from 'react'
import { UserInfoContext } from '../context/UserInfo/UserInfoContext'
import AddTeamModal from './Modals/AddTeamModal'
import Section from './Section'
import Button from './Button'
import Spinner from './Spinner'
import List from './List'

const TeamsSection = () => {
    const {
        teams,
        isLoadingTeams
    } = useContext(UserInfoContext)
    const [isAddTeam, setIsAddTeam] = useState(false)

    return (
        <Section>
            {isLoadingTeams ? (
                <Spinner />
            ) : (
                <>
                    <div className='subsection'>
                        <div className='h1'>Команды</div>
                        <Button
                            className='left'
                            onClick={() => setIsAddTeam(true)}
                        >
                            Добавить
                        </Button>
                        <AddTeamModal
                            isOpen={isAddTeam}
                            onClose={() => setIsAddTeam(false)}
                        />
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