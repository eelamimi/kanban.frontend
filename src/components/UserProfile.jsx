import { useContext } from 'react';
import { UserInfoContext } from '../context/UserInfo/UserInfoContext';
import { Link } from 'react-router';
import Button from './Button';
import UserProfileSection from './UserProfile/Section';
import UserProfileCard from './UserProfile/Card';

const UserProfile = () => {
    const {
        teams,
        isLoadingTeams
    } = useContext(UserInfoContext)

    return (
        <>
            <UserProfileSection>
                <UserProfileCard />
            </UserProfileSection>
            <UserProfileSection>
                <div className='userProfile__team-header'>
                    <div className="userProfile__h1">Команды</div>
                    <Button className='userProfile__button'>Создать команду</Button>
                </div>
                <div className="userProfile__teams-list">
                    {teams && teams.map((team) => (
                        <div key={team.id} className="userProfile__team-item">
                            <Link
                                className="userProfile__team-name"
                                to={`/teams/${team.id}`}
                            >
                                {team.name}
                            </Link>
                            <div className="userProfile__team-role">{team.role}</div>
                        </div>
                    ))}
                </div>
            </UserProfileSection>
        </>
    );
};

export default UserProfile
