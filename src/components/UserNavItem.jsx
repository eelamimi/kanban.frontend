import { memo, useCallback, useContext } from 'react'
import { UserInfoContext } from '../context/UserInfo/UserInfoContext'
import baseAvatar from '../assets/img/default_avatar.jpg'
import Button from './Button'
import { Link } from 'react-router'
import AuthService from '../service/AuthService'

const UserNavItem = () => {
    const {
        firstName,
        secondName,
        avatar
    } = useContext(UserInfoContext)

    const handleExit = useCallback(() => {
        AuthService.clearUserInfo()
        AuthService.redirectToLogin()
    }, [])

    return (
        <div className='nav-item user-nav'>
            <img
                className='user-nav-item__avatar'
                src={!avatar ? baseAvatar : `data:image/jpeg;base64,${avatar}`}
                alt='Фото профиля'
                loading='lazy'
                width={32}
                height={32}
            />
            <Link
                className='user-nav-item__name'
                to='/profile'
            >
                {`${firstName} ${secondName}`}
            </Link>
            <Button
                className='exit-button'
                onClick={handleExit}
                title='Выйти'
            >
                ✖
            </Button>
        </div>
    )
}

export default memo(UserNavItem)