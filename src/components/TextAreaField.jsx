import { useRef, useEffect, useCallback } from 'react'

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

    const textareaRef = useRef(null)

    const autoResize = useCallback(() => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${Math.max(88, textarea.scrollHeight)}px`
            console.log(textarea.scrollHeight)
        }
    }, [])

    useEffect(() => {
        autoResize()
    }, [autoResize, value])

    const handleInput = useCallback((e) => {
        autoResize()
        if (onInput) onInput(e)
    }, [autoResize, onInput])

    return (
        <div className={`field ${fieldClassName}`}>
            <textarea
                ref={textareaRef}
                className={`field__textarea ${error ? 'is-invalid' : ''} ${textareaClassName}`}
                placeholder=''
                id={id}
                value={value}
                onInput={handleInput}
                required={required}
                autoComplete={autoComplete}
                rows={rows}
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

export default TextareaField