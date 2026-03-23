function FieldSet({ title, children }) {
    return (
        <fieldset
            className='fieldset'
        >
            <legend>{title}</legend>
            {children}
        </fieldset>
    )
}

export default FieldSet