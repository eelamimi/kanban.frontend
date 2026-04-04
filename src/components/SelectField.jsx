const SelectField = ({
    id,
    label,
    value,
    onChange,
    options,
    error,
    required = false,
    className = ''
}) => {
    return (
        <div className={`field ${className}`}>
            <select
                className={`field__input field__select ${error ? 'is-invalid' : ''} ${value ? 'has-value' : ''}`}
                id={id}
                value={value}
                onChange={onChange}
                required={required}
            >
                {/* <option value='' disabled hidden></option> */}
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label className='field__label' htmlFor={id}>
                {label}
            </label>
            {error && (
                <span className='field__error' title={error}>{error}</span>
            )}
        </div>
    )
}

export default SelectField