import { useEffect, useState } from 'react'
import AuthService from '../service/AuthService'

export const useRequireAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const check = async () => {
            const isValid = await AuthService.checkToken()
            setIsAuthenticated(isValid)
            setIsLoading(false)
        }

        check()

        const interval = setInterval(check, 60 * 60 * 1000)

        return () => clearInterval(interval)
    }, [])

    return { isAuthenticated, isLoading }
}