import UserProfile from '../components/UserProfile'
import UserInfoProvider from '../context/UserInfo/UserInfoProvider'

const ProfilePage = () => {
    return (
        <UserInfoProvider>
            <UserProfile />
        </UserInfoProvider>
    )
}

export default ProfilePage
