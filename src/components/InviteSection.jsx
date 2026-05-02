import { memo } from 'react'
import Section from './Section'
import Button from './Button'

const InviteSection = () => {
    return (
        <Section className='invite-section'>
            <Button>
                Принять приглашение
            </Button>
        </Section>
    )
}

export default memo(InviteSection)