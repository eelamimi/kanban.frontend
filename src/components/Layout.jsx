import { Outlet } from 'react-router';
import NavItem from './NavItem';
import UserInfoProvider from '../context/UserInfo/UserInfoProvider';

const Layout = () => {


    return (
        <UserInfoProvider>
            <header>
                <nav>
                    <NavItem className='combobox'>Projects</NavItem>
                    <NavItem className='combobox'>Projects</NavItem>
                    <NavItem className='combobox'>Projects</NavItem>
                    <NavItem className='combobox'>Projects</NavItem>
                    <NavItem className='profile'>Profile</NavItem>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </UserInfoProvider>
    )
};

export default Layout
