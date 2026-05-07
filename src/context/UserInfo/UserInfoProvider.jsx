import { useSearchParams } from 'react-router'
import { useTeams } from '../../hook/useTeams'
import useUserInfo from '../../hook/useUserInfo'
import { UserInfoContext } from './UserInfoContext'
import { useEffect } from 'react'
import AuthService from '../../service/AuthService'

const UserInfoProvider = ({ children }) => {
    const [searchParams] = useSearchParams()
    const userIdFromUrl = searchParams.get('userId')

    const {
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
        loadUserById,
        user,
    } = useUserInfo()

    const {
        teams,
        setTeams,
        isLoadingTeams,
        loadTeamsByUserId
    } = useTeams()

    useEffect(() => {
        if (userIdFromUrl) {
            loadUserById(userIdFromUrl)
            loadTeamsByUserId(userIdFromUrl)
        }
        else {
            const userProfileId = AuthService.getUserInfo().userProfileId
            loadUserById(userProfileId)
            loadTeamsByUserId(userProfileId)
        }
    }, [userIdFromUrl, loadUserById, loadTeamsByUserId])

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
                setTeams,
                isLoadingTeams,
                user,
            }}
        >
            {children}
        </UserInfoContext.Provider>
    )
}

export default UserInfoProvider