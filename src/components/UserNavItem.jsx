import { memo, useCallback, useContext, useMemo } from 'react'
import { UserInfoContext } from '../context/UserInfo/UserInfoContext'
import baseAvatar from '../assets/img/default_avatar.jpg'
import Button from './Button'
import { Link } from 'react-router'
import AuthService from '../service/AuthService'

const UserNavItem = () => {
    const { user } = useContext(UserInfoContext)
    const avatar = useMemo(() => user?.avatar,
        [user?.avatar])
    const fullName = useMemo(() => `${user?.firstName} ${user?.secondName}`,
        [user.firstName, user.secondName])

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
                {fullName}
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