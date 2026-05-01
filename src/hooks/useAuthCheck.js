import { useEffect, useRef } from 'react'
import AuthService from '../service/AuthService'

export const useAuthCheck = () => {
    const isInitialized = useRef(false)

    useEffect(() => {
        if (isInitialized.current) return
        isInitialized.current = true

        const init = async () => {
            const isValid = await AuthService.checkToken()

            if (isValid) {
                AuthService.startPeriodicCheck()
            }
        }

        init()

        return () => {
            AuthService.stopPeriodicCheck()
        }
    }, [])
}
