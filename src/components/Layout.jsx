import { Outlet } from 'react-router'
import { memo } from 'react'
import Header from './Header'
import UserInfoProvider from '../context/UserInfo/UserInfoProvider'

const Layout = () => {
    return (
        <UserInfoProvider>
            <Header />
            <main>
                <Outlet />
            </main>
        </UserInfoProvider>
    )
}

export default memo(Layout)
