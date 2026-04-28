import { useContext } from 'react';
import baseAvatar from '../../assets/img/default_avatar.jpg'
import { UserInfoContext } from '../../context/UserInfo/UserInfoContext'
import AuthService from '../../service/AuthService'

const UserProfileAvatar = () => {
    const { avatar } = useContext(UserInfoContext)

    return (
        <div className='userProfile__avatar-wrapper'>
            <img
                className='userProfile__avatar'
                src={!avatar ? baseAvatar : `data:image/jpeg;base64,${avatar}`}
                alt='Фото профиля'
                loading='lazy'
            />
            <div className='userProfile__avatar-overlay'>
                <span>Изменить фото</span>
            </div>
        </div>
    )
}

export default UserProfileAvatar