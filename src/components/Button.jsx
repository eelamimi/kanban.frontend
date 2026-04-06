import { memo } from 'react'

function Button(props) {
    const {
        className = '',
        type = 'button',
        isDisabled,
        onClick,
        children
    } = props

    return (
        <button
            className={`button ${className}`}
            type={type}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default memo(Button)