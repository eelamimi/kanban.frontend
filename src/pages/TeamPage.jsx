import TeamDetails from '../components/TeamDetails'
import TeamProvider from '../context/Team/TeamProvider'

const TeamPage = () => {
    return (
        <TeamProvider>
            <TeamDetails />
        </TeamProvider>
    )
}

export default TeamPage