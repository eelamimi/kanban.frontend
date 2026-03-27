import { useEffect, useState } from 'react'
import userAPI from '../api/userAPI'
import AuthService from '../service/AuthService'

const useUserInfo = () => {
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [email, setEmail] = useState('')
    const [createdAt, setCreatedAt] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [isUserInfoLoading, setIsUserInfoLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const { userId } = AuthService.getUserInfo()
            const response = await userAPI.getUserInfo(userId)
            setFirstName(response.firstName)
            setSecondName(response.secondName)
            setEmail(response.email)
            setCreatedAt(response.createdAt)
            setAvatar(response.avatar)
            setIsUserInfoLoading(false)
        }

        fetchData()
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
        createdAt
    }
}

export default useUserInfo