const Span = ({
    className = '',
    labelClassName = '',
    imageClassName = '',
    label,
    value,
    src,
    w,
    h
}) => {
    return (
        <div className={`field-ro ${className}`}>
            {label &&
                <div
                    className={`field-ro_label ${labelClassName}`}
                >
                    {label}
                </div>}
            {src
                ? <img
                    className={imageClassName}
                    src={src}
                    alt={value}
                    width={w}
                    height={h}
                />
                : value
                    ? <span>{value}</span>
                    : <></>}
        </div>
    )
}

export default Span