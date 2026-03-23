import { Link } from 'react-router'
import avatar from '../assets/img/500x500.jpg'

const UserProfile = () => {
    return (
        <div className="userProfile">
            <h1>Профиль</h1>
            <img src={avatar} alt='Avatar' />
        </div>
    )
}

export default UserProfile
