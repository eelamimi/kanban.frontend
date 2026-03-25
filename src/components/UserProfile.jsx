import UserProfileCard from './UserProfile/Card'
import Section from './Section'
import TeamsSection from './TeamsSection'

const UserProfile = () => {
    return (
        <>
            <Section>
                <UserProfileCard />
            </Section>
            <TeamsSection />
        </>
    );
};

export default UserProfile
