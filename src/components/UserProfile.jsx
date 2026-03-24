import baseAvatar from '../assets/img/real_avatar.jpg'
import { useContext } from 'react';
import { UserInfoContext } from '../context/UserInfo/UserInfoContext';
import { formatDate } from '../utils/dataFormatter';

const UserProfile = () => {
    const {
        firstName,
        secondName,
        email,
        avatar,
        createdAt
    } = useContext(UserInfoContext)

    return (
        <div className="userProfile__card">
            <img className="userProfile__avatar" src={avatar !== '' ? avatar : baseAvatar} alt="Фото профиля" />
            <div className="userProfile__info">
                <div className="userProfile__fullName">
                    {`${firstName} ${secondName}`}
                </div>
                <div className="userProfile__row">
                    <div className="userProfile__label">Почта:</div>
                    <span>{email}</span>
                </div>
                <div className="userProfile__row">
                    <div className="userProfile__label">Дата регистрации:</div>
                    <span>{formatDate(createdAt)}</span>
                </div>
            </div>
        </div >
    );
};

export default UserProfile
