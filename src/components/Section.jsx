const Section = ({ className, children }) => {
    return (
        <div className={`section ${className}`}>
            {children}
        </div>
    )
}

export default Section