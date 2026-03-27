import { Link } from 'react-router'

const TeamsList = ({ teams }) => {
    return (
        <div className="teamsSection__teams-list">
            {teams && teams.map((team) => (
                <div key={team.id} className="teamsSection__team-item">
                    <Link
                        className="teamsSection__team-name"
                        to={`/teams/${team.id}`}
                    >
                        {team.name}
                    </Link>
                    <div className="teamsSection__team-role">{team.role.name}</div>
                </div>
            ))}
        </div>
    )
}

export default TeamsList