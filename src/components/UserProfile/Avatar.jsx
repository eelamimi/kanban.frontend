import baseAvatar from '../../assets/img/default_avatar.jpg'

const UserProfileAvatar = ({ avatar }) => {
    return (<div className='userProfile__avatar-wrapper'>
        <img
            className='userProfile__avatar'
            src={avatar || baseAvatar}
            alt='Фото профиля'
        />
        <div className='userProfile__avatar-overlay'>
            <span>Изменить фото</span>
        </div>
    </div>)
}

export default UserProfileAvatar