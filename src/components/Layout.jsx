import { Outlet } from 'react-router';
import NavItem from './NavItem';

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
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
};

export default Layout
