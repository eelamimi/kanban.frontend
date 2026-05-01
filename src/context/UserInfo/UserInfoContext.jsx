/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { useTeams } from '../../hooks/useTeams'
import useUserInfo from '../../hooks/useUserInfo'
import AuthService from '../../service/AuthService'

export const UserInfoContext = createContext({})

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
                isLoadingTeams
            }}
        >
            {children}
        </UserInfoContext.Provider>
    )
}

export default UserInfoProvider
