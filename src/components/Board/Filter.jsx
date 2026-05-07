import { memo } from 'react'
import Button from '../Button'

const Filter = ({ children, title }) => {
    return (
        <Button
            className='filter'
            title={title}
        >
            {children}
        </Button>
    )
}

export default memo(Filter)