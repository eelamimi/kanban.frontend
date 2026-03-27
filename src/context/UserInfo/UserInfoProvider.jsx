import { useTeams } from '../../hook/useTeams'
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
        isUserInfoLoading,
        createdAt
    } = useUserInfo()

    const {
        teams,
        isLoadingTeams
    } = useTeams()

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
                isUserInfoLoading,
                createdAt,
                teams,
                isLoadingTeams
            }}
        >
            {children}
        </UserInfoContext.Provider>
    )
}

export default UserInfoProvider