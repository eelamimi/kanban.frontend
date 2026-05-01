import TeamsSection from '../components/TeamsSection'
import UserInfoProvider from '../context/UserInfo/UserInfoContext'

const TeamsPage = () => {
    return (
        <UserInfoProvider>
            <TeamsSection />
        </UserInfoProvider>
    )
}

export default TeamsPage