import { memo } from 'react'
import Button from '../Button'

const Filter = ({ member }) => {
    return (
        <Button
            className='filter'
            title={`${member.firstName} ${member.secondName}`}
        >
            {member.firstName}
        </Button>
    )
}

export default memo(Filter)