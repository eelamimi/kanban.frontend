import { useCallback, useContext, useMemo, useState } from 'react'
import baseAvatar from '../../assets/img/default_avatar.jpg'
import { UserInfoContext } from '../../context/UserInfo/UserInfoContext'
import AuthService from '../../service/AuthService'
import { showError } from '../../utils/errorHandler'
import userAPI from '../../api/userAPI'
import { useSearchParams } from 'react-router'

const UserProfileAvatar = () => {
    const [searchParams] = useSearchParams()
    const userIdFromUrl = searchParams.get('userId')
    const { avatar, setAvatar } = useContext(UserInfoContext)
    const [isUploading, setIsUploading] = useState(false)

    const canEditAvatar = useMemo(() =>
        userIdFromUrl === AuthService.getUserInfo().userProfileId,
        [userIdFromUrl])

    const handleFileChange = useCallback(async (event) => {
        const file = event.target.files[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            showError('Пожалуйста, выберите изображение')
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            showError('Файл слишком большой. Максимум 5MB')
            return
        }

        setIsUploading(true)

        try {
            const form = new FormData()
            form.append('Avatar', file)

            const bytes = await userAPI.updateAvatar(form)
            setAvatar(bytes)
        } catch (error) {
            console.error('Ошибка загрузки:', error)
            showError('Не удалось загрузить фото')
        } finally {
            setIsUploading(false)
        }
    }, [setAvatar])

    return (
        <div className={`userProfile__avatar-wrapper ${!canEditAvatar
            ? '--disabled' : ''}`}>
            <img
                className='userProfile__avatar'
                src={!avatar ? baseAvatar : `data:image/jpeg;base64,${avatar}`}
                alt='Фото профиля'
                loading='lazy'
            />
            {canEditAvatar &&
                < div className='userProfile__avatar-overlay'>
                    <label style={{
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        {isUploading ? 'Загрузка...' : 'Изменить фото'}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            disabled={isUploading}
                        />
                    </label>
                </div>}
        </div >
    )
}

export default UserProfileAvatar