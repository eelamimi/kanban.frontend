const Span = ({ label, value }) => {
    return (
        <div className='field-ro'>
            {label && <div className='field-ro_label'>{label}</div>}
            <span>{value}</span>
        </div>
    )
}

export default Span