import Button from './Button'

const ModalSection = ({ title, children, onClick, buttonTitle }) => {
    return (
        <div className='modal-section'>
            {title && <div className='h1' style={{ marginBottom: '25px' }}>{title}</div>}
            {children}
            {onClick &&
                <div style={{ display: 'flex' }}>
                    <Button
                        className='left'
                        onClick={onClick}
                    >
                        {buttonTitle}
                    </Button>
                </div>
            }
        </div>
    )
}

export default ModalSection