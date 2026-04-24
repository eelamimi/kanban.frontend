import { memo, useContext } from 'react'
import { UserInfoContext } from '../../context/UserInfo/UserInfoContext'
import { formatDate } from '../../utils/dataFormatter'
import UserProfileAvatar from './Avatar'
import UserProfileInfo from './Info'
import UserProfileFullName from './FullName'
import Span from '../Span'
import Section from '../Section'

const UserProfileCard = memo(() => {
    const {
        firstName,
        secondName,
        email,
        avatar,
        createdAt,
    } = useContext(UserInfoContext)

    return (
        <Section>
            <div className='userProfile__card'>
                <UserProfileAvatar avatar={avatar} />
                <UserProfileInfo>
                    <UserProfileFullName
                        firstName={firstName}
                        secondName={secondName}
                    />
                    <Span
                        label='Почта:'
                        value={email}
                    />
                    <Span
                        label='Зарегистрирован:'
                        value={formatDate(createdAt)}
                    />
                </UserProfileInfo>
            </div >
        </Section>
    )
})

export default UserProfileCard