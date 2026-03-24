import { useEffect, useState } from 'react'
import userAPI from '../api/userAPI'

const useUserInfo = () => {
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [email, setEmail] = useState('')
    const [createdAt, setCreatedAt] = useState(null)
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const response = await userAPI.getUserInfo()
            setFirstName(response.firstName)
            setSecondName(response.secondName)
            setEmail(response.email)
            setCreatedAt(response.createdAt)
            setAvatar(response.avatar)
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
        createdAt
    }
}

export default useUserInfo