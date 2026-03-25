import baseAvatar from '../assets/img/default_avatar.jpg'
import { useContext } from 'react';
import { UserInfoContext } from '../context/UserInfo/UserInfoContext';
import { formatDate } from '../utils/dataFormatter';
import { Link } from 'react-router';
import Button from './Button';

const UserProfile = () => {
    const {
        firstName,
        secondName,
        email,
        avatar,
        createdAt,
        teams,
        isLoadingTeams
    } = useContext(UserInfoContext)

    return (
        <>
            <div className="userProfile__section">
                <div className='userProfile__card'>
                    <div className='userProfile__avatar-wrapper'>
                        <img
                            className='userProfile__avatar'
                            src={avatar || baseAvatar}
                            alt='Фото профиля'
                        />
                        <div className='userProfile__avatar-overlay'>
                            <span>Изменить фото</span>
                        </div>
                    </div>
                    <div className='userProfile__info'>
                        <div className='userProfile__fullName'>
                            {`${firstName} ${secondName}`}
                        </div>
                        <div className='userProfile__row'>
                            <div className='userProfile__label'>Почта:</div>
                            <span>{email}</span>
                        </div>
                        <div className='userProfile__row'>
                            <div className='userProfile__label'>Дата регистрации:</div>
                            <span>{formatDate(createdAt)}</span>
                        </div>
                    </div>
                </div >
            </div>
            <div className='userProfile__section'>
                <div className='userProfile__h1'>Команды</div>
                <div className="userProfile__teams-list">
                    {teams.map((team, index) => (
                        <div key={index} className="userProfile__team-item">
                            <Link className="userProfile__team-name">{team.name}</Link>
                            <div className="userProfile__team-role">{team.role}</div>
                        </div>
                    ))}
                </div>
                <Button className='userProfile__button'>Создать команду</Button>
            </div>
        </>
    );
};

export default UserProfile
