import { memo } from 'react'

function Button(props) {
    const {
        className = '',
        type = 'button',
        isDisabled,
        onClick,
        children,
        title
    } = props

    return (
        <button
            className={`button ${className}`}
            type={type}
            disabled={isDisabled}
            onClick={onClick}
            title={title}
        >
            {children}
        </button>
    )
}

export default memo(Button)