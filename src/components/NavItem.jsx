const NavItem = (props) => {
    const {
        className,
        children
    } = props

    return (
        <div className={`nav__item ${className}`}>
            {children}
        </div>
    )
}

export default NavItem
