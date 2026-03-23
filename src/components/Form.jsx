function Form(props) {
    const {
        className = '',
        onSubmit,
        children
    } = props

    return (
        <form
            className={`form ${className}`}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    )
}

export default Form