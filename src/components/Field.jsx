import { memo } from 'react'

function Field(props) {
    const {
        id,
        fieldClassName = '',
        inputClassName = '',
        label,
        type,
        required,
        value,
        onInput,
        error,
        autoComplete,
        ref,
        min = 1,
        max = 20,
    } = props

    return (
        <div className={`field ${fieldClassName}`}>
            <input
                className={`field__input ${error ? 'is-invalid' : ''} ${inputClassName}`}
                placeholder=''
                id={id}
                type={type}
                value={value}
                onInput={onInput}
                ref={ref}
                required={required}
                autoComplete={autoComplete}
                {...(type === 'number' && { min: min, max: max })}
            />
            <label
                className='field__label'
                htmlFor={id}
            >
                {label}
            </label>
            {error && (
                <span className='field__error' title={error}>{error}</span>
            )}
        </div>
    )
}

export default memo(Field)