import { useCallback, useState } from 'react'
import userAPI from '../api/userAPI'
import AuthService from '../service/AuthService'

const useUserInfo = () => {
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [email, setEmail] = useState('')
    const [createdAt, setCreatedAt] = useState(null)
    const [avatar, setAvatar] = useState('')
    const [isUserInfoLoading, setIsUserInfoLoading] = useState(true)
    const [navAvatar, setNavAvatar] = useState('')
    const [user, setUser] = useState({
        firstName: '',
        secondName: '',
    })

    const loadUserById = useCallback(async (userId) => {
        const response = await userAPI.getUserInfo(userId)
        setFirstName(response.firstName)
        setSecondName(response.secondName)
        setEmail(response.email)
        setCreatedAt(response.createdAt)
        setAvatar(response.avatar)

        const curUserId = AuthService.getUserInfo().userProfileId
        if (userId === curUserId) {
            setUser(response)
            setNavAvatar(response.avatar)
        } else {
            const curUser = await userAPI.getUserInfo(curUserId)
            setUser(curUser)
            setNavAvatar(curUser.avatar)
        }

        setIsUserInfoLoading(false)
    }, [])

    return {
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
        navAvatar,
        setNavAvatar,
    }
}

export default useUserInfo