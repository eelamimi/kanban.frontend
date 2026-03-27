import { useContext } from 'react'
import { UserInfoContext } from '../../context/UserInfo/UserInfoContext'
import { formatDate } from '../../utils/dataFormatter';
import UserProfileAvatar from './Avatar'
import UserProfileInfo from './Info'
import UserProfileFullName from './FullName'
import UserProfileField from './Field'
import Spinner from '../Spinner';

const UserProfileCard = () => {
    const {
        firstName,
        secondName,
        email,
        avatar,
        isUserInfoLoading,
        createdAt,
    } = useContext(UserInfoContext)

    return (
        <div className='userProfile__card'>
            {isUserInfoLoading ? (
                <Spinner />
            ) : (
                <>
                    <UserProfileAvatar avatar={avatar} />
                    <UserProfileInfo>
                        <UserProfileFullName
                            firstName={firstName}
                            secondName={secondName}
                        />
                        <UserProfileField
                            label='Почта'
                            value={email}
                        />
                        <UserProfileField
                            label='Зарегистрирован'
                            value={formatDate(createdAt)}
                        />
                    </UserProfileInfo>
                </>
            )}
        </div >
    )
}

export default UserProfileCard