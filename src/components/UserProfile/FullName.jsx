const UserProfileFullName = ({ firstName, secondName }) => {
    return (
        <div className='userProfile__fullName'>
            {`${firstName} ${secondName}`}
        </div>
    )
}

export default UserProfileFullName