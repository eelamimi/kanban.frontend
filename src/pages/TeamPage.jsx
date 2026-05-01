import TeamDetails from '../components/TeamDetails'
import TeamProvider from '../context/Team/TeamContext'

const TeamPage = () => {
    return (
        <TeamProvider>
            <TeamDetails />
        </TeamProvider>
    )
}

export default TeamPage