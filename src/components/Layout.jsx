// import exitIcon from '../assets/img/icon_exit.png'
import { Outlet } from 'react-router'

const Layout = () => {


    return (
        <>
        <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout
