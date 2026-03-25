const UserProfileField = ({ label, value }) => {
    return (
        <div className='userProfile__field'>
            <div className='userProfile__label'>{`${label}:`}</div>
            <span>{value}</span>
        </div>
    )
}

export default UserProfileField