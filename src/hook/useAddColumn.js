import { useCallback, useState } from 'react'

export const useAddColumn = () => {
    const [isWaitingAddColumn, setIsWaitingAddColumn] = useState(false)
    const [columnName, setColumnName] = useState('')
    const [errorColumnName, setErrorColumnName] = useState('')
    const [columnPosition, setColumnPosition] = useState(1)

    const onColumnNameInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setColumnName(value)
        setErrorColumnName(hasOnlySpaces ? 'Название обязательно' : '')
    }, [])

    const validateValues = useCallback(() => {
        let isValid = true

        const clearValue = columnName.trim()
        const hasOnlySpaces = columnName.length > 0 && clearValue.length === 0
        if (hasOnlySpaces || columnName.length === 0) {
            setErrorColumnName('Название обязательно')
            isValid = false
        }

        return isValid
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