import { useSearchParams } from 'react-router'
import { memo, useCallback } from 'react'
import AuthService from '../service/AuthService'
import inviteAPI from '../api/inviteAPI'
import Section from './Section'
import Button from './Button'

const InviteSection = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    const handleInviteUser = useCallback(async () => {
        const teamId = await inviteAPI.sendToken({
            Token: token
        })
        window.location.href = `/teams/${teamId}`
    }, [token])

    return (
        <Section className='invite-section'>
            <Button onClick={handleInviteUser}>
                Принять приглашение
            </Button>
        </Section>
    )
}

export default memo(InviteSection)