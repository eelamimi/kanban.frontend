import { memo } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

function TextareaField(props) {
    const {
        id,
        fieldClassName = '',
        textareaClassName = '',
        label,
        required,
        value,
        onInput,
        error,
        autoComplete,
        rows = 3,
    } = props

    return (
        <div className={`field ${fieldClassName}`}>
            <TextareaAutosize
                className={`field__textarea ${error ? 'is-invalid' : ''} ${textareaClassName}`}
                placeholder=''
                id={id}
                value={value}
                onChange={onInput}
                required={required}
                autoComplete={autoComplete}
                minRows={rows}
            />
            <label className='field__label' htmlFor={id}>
                {label}
            </label>
            {error && (
                <span className='field__error' title={error}>{error}</span>
            )}
        </div>
    )
}

export default memo(TextareaField)