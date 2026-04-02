const Span = ({ className = '', label, value }) => {
    return (
        <div className={`field-ro ${className}`}>
            {label && <div className='field-ro_label'>{label}</div>}
            <span>{value}</span>
        </div>
    )
}

export default Span