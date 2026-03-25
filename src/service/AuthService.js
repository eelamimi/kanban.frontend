import authAPI from '../api/authAPI'

class AuthService {
    static TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY
    static USER_ID_KEY = import.meta.env.VITE_USER_ID
    static USER_PROFILE_ID_KEY = import.meta.env.VITE_USER_PROFILE_ID
    static CHECK_INTERVAL = 60 * 60 * 1000
    static checkIntervalId = null

    static getUserInfo() {
        return {
            token: localStorage.getItem(this.TOKEN_KEY),
            userId: localStorage.getItem(this.USER_ID_KEY),
            userProfileId: localStorage.getItem(this.USER_PROFILE_ID_KEY)
        }
    }

    static setUserInfo({ token, userId, userProfileId }) {
        localStorage.setItem(this.TOKEN_KEY, token)
        localStorage.setItem(this.USER_ID_KEY, userId)
        localStorage.setItem(this.USER_PROFILE_ID_KEY, userProfileId)
    }

    static clearUserInfo() {
        localStorage.removeItem(this.TOKEN_KEY)
        localStorage.removeItem(this.USER_ID_KEY)
        localStorage.removeItem(this.USER_PROFILE_ID_KEY)
        this.stopPeriodicCheck()
    }

    static async verifyToken() {
        const { token, userId, userProfileId } = this.getUserInfo()
        if (!token || !userId || !userProfileId)
            return false

        try {
            const response = await authAPI.verifyToken({ Token: token })
            return response.isValid
        } catch (error) {
            console.error('Ошибка проверки токена:', error)
            return false
        }
    }

    static async checkToken() {
        const isValid = await this.verifyToken()

        if (!isValid) {
            this.clearUserInfo()
            this.redirectToLogin()
        }

        return isValid;
    }

    static startPeriodicCheck() {
        this.stopPeriodicCheck()

        this.checkIntervalId = setInterval(async () => {
            await this.checkToken()
        }, this.CHECK_INTERVAL)
    }

    static stopPeriodicCheck() {
        if (this.checkIntervalId) {
            clearInterval(this.checkIntervalId)
            this.checkIntervalId = null
        }
    }

    static redirectToLogin() {
        if (window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login'
        }
    }
}

export default AuthService;
