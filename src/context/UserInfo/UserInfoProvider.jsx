import useUserInfo from '../../hook/useUserInfo'
import { UserInfoContext } from './UserInfoContext'

const UserInfoProvider = ({ children }) => {
    const { firstName,
        setFirstName,
        secondName,
        setSecondName,
        email,
        setEmail,
        avatar,
        setAvatar,
        createdAt
    } = useUserInfo()

    return (
        <UserInfoContext.Provider
            value={{
                firstName,
                setFirstName,
                secondName,
                setSecondName,
                email,
                setEmail,
                avatar,
                setAvatar,
                createdAt
            }}
        >
            {children}
        </UserInfoContext.Provider>
    )
}

export default UserInfoProvider