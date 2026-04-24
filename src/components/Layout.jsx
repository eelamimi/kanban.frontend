// import exitIcon from '../assets/img/icon_exit.png'
import { Outlet } from 'react-router'
import NavItem from './NavItem'
// import UserInfoProvider from '../context/UserInfo/UserInfoProvider'

const Layout = () => {


    return (
        <>
            <header>
                <nav>
                    <NavItem className='combobox'>Projects</NavItem>
                    <NavItem className='combobox'>Projects</NavItem>
                    <NavItem className='combobox'>Projects</NavItem>
                    <NavItem className='combobox'>Projects</NavItem>
                    <NavItem className='profile'>Profile</NavItem>
                    {/* <NavItem className='profile-exit'>
                        <img
                            src={exitIcon}
                            alt='exit'
                        />
                    </NavItem> */}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout
