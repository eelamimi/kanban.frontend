import { Link } from 'react-router'
import avatar from '../assets/img/real_avatar.jpg'

const UserProfile = () => {
    const firstName = 'Александр'
    const secondName = 'Петров'
    const email = 'b.gleba77@gmail.com'
    const createdAt = '24 марта 2026 г.'

    return (
        <div className="userProfile__card">
            <img className="userProfile__avatar" src={avatar} alt="Фото профиля" />
            <div className="userProfile__info">
                <div class="userProfile__fullName">
                    {`${firstName} ${secondName}`}
                </div>
                <div className="userProfile__row">
                    <div className="userProfile__label">Почта:</div>
                    <span>{email}</span>
                </div>
                <div className="userProfile__row">
                    <div className="userProfile__label">Дата регистрации:</div>
                    <span>{createdAt}</span>
                </div>
            </div>
        </div >
    );
};

export default UserProfile
