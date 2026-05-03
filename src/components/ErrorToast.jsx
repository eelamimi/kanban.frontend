import { memo, useEffect, useState, useCallback } from 'react'

const ErrorToast = ({ message, onClose }) => {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(onClose, 300)
  }, [onClose])

  useEffect(() => {
    const timer = setTimeout(handleClose, 5000)
    return () => clearTimeout(timer)
  }, [handleClose])

  return (
    <div className={`error-toast ${isClosing ? 'error-toast--closing' : 'error-toast--entering'}`}>
      <p className="error-toast__message">{message}</p>
    </div>
  )
}

export default memo(ErrorToast)
