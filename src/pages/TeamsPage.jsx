import TeamsSection from '../components/TeamsSection'
import UserInfoProvider from '../context/UserInfo/UserInfoProvider'

const TeamsPage = () => {
    return (
        <UserInfoProvider>
            <TeamsSection />
        </UserInfoProvider>
    )
}

export default TeamsPage