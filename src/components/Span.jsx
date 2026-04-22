const Span = ({ className = '', label, value, imageClassName, src, w, h }) => {
    return (
        <div className={`field-ro ${className}`}>
            {label && <div className='field-ro_label'>{label}</div>}
            {src
                ? <img className={imageClassName} src={src} alt={value} width={w} height={h} />
                : <span>{value}</span>}
        </div>
    )
}

export default Span