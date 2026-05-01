import { useCallback, useState } from 'react'
import { isBlank } from '../utils/fieldValidation'

export const useAddColumn = () => {
    const [isWaitingAddColumn, setIsWaitingAddColumn] = useState(false)
    const [columnName, setColumnName] = useState('')
    const [errorColumnName, setErrorColumnName] = useState('')
    const [columnPosition, setColumnPosition] = useState(1)

    const onColumnNameInput = useCallback(({ target }) => {
        const { value } = target
        setColumnName(value)
        setErrorColumnName(isBlank(value) ? 'Название обязательно' : '')
    }, [])

    const validateValues = useCallback(() => {
        if (isBlank(columnName)) {
            setErrorColumnName('Название обязательно')
            return false
        }
        return true
    }, [columnName])

    const resetValues = useCallback(() => {
        setIsWaitingAddColumn(false)
        setColumnName('')
        setColumnPosition(2)
        setErrorColumnName('')
    }, [])

    return {
        isWaitingAddColumn,
        setIsWaitingAddColumn,

        columnName,
        errorColumnName,
        columnPosition,

        onColumnNameInput,
        setErrorColumnName,
        setColumnPosition,

        validateValues,
        resetValues,
    }
}
