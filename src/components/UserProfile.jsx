import UserProfileCard from './UserProfile/Card'
import Section from './Section'
import TeamsSection from './TeamsSection'
import Spinner from './Spinner'
import { useContext } from 'react';
import { UserInfoContext } from '../context/UserInfo/UserInfoContext';

const UserProfile = () => {
    const {
        isUserInfoLoading
    } = useContext(UserInfoContext)

    return (
        <>
            <Section>
                {isUserInfoLoading ? <Spinner /> : <UserProfileCard />}
            </Section>
            <TeamsSection />
        </>
    );
};

export default UserProfile
