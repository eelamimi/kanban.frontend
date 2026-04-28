import { useContext } from 'react'
import baseAvatar from '../../assets/img/default_avatar.jpg'
import { UserInfoContext } from '../../context/UserInfo/UserInfoContext'

const UserProfileAvatar = () => {
    const { avatar } = useContext(UserInfoContext)

    return (
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
    )
}

export default UserProfileAvatar