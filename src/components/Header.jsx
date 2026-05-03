import { memo } from 'react'
import UserNavItem from './UserNavItem'
import TeamsNavItem from './TeamsNavItem'

const Header = () => {
    return (
        <header>
            <div className='nav-item h1'>Канбанич</div>
            <TeamsNavItem />
            <UserNavItem />
        </header>
    )
}

export default memo(Header)