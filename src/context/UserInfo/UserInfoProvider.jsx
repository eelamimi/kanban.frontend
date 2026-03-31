import { useSearchParams } from 'react-router'
import { useTeams } from '../../hook/useTeams'
import useUserInfo from '../../hook/useUserInfo'
import { UserInfoContext } from './UserInfoContext'
import { useEffect } from 'react'
import AuthService from '../../service/AuthService'

const UserInfoProvider = ({ children }) => {
    const [searchParams] = useSearchParams()
    const userIdFromUrl = searchParams.get('userId')

    const { firstName,
        setFirstName,
        secondName,
        setSecondName,
        email,
        setEmail,
        avatar,
        setAvatar,
        isUserInfoLoading,
        createdAt,
        loadUserById
    } = useUserInfo()

    const {
        teams,
        isLoadingTeams
    } = useTeams()

    useEffect(() => {
        if (userIdFromUrl) {
            loadUserById(userIdFromUrl);
        }
        else {
            loadUserById(AuthService.getUserInfo().userProfileId)
        }

    }, [userIdFromUrl, loadUserById]);

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