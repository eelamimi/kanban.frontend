import { useCallback, useContext, useState } from 'react'
import ModalSection from '../ModalSection'
import Field from '../Field'
import { ProjectContext } from '../../context/Project/ProjectContext'
import { useAddColumn } from '../../hooks/useAddColumn'
import columnAPI from '../../api/columnAPI'

const AddColumnSection = ({ onClose }) => {
    const { project, setProject } = useContext(ProjectContext)
    const [maxPosition, setMaxPosition] = useState(project.columns.length - 1)
    const {
        isWaitingAddColumn,
        setIsWaitingAddColumn,
        columnName,
        errorColumnName,
        columnPosition,
        onColumnNameInput,
        setColumnPosition,
        validateValues,
        resetValues,
    } = useAddColumn()

    const handleAddColumnSubmit = useCallback(async () => {
        setIsWaitingAddColumn(true)

        if (!validateValues()) {
            setIsWaitingAddColumn(false)
            return false
        }

        try {
            const newColumn = await columnAPI.add({
                ProjectId: project.id,
                Name: columnName.trim(),
                Position: columnPosition,
            })

            setProject(prev => {
                const updatedColumns = prev.columns.map(col => {
                    const shouldShift = col.position >= newColumn.position
                        && col.id !== newColumn.id

                    if (shouldShift) {
                        return { ...col, position: col.position + 1 }
                    }
                    return col
                })

                return {
                    ...prev,
                    columns: [...updatedColumns, newColumn]
                        .sort((a, b) => a.position - b.position)
                }
            })
            setMaxPosition(maxPosition + 1)

            return true
        } catch (error) {
            console.error('Ошибка при добавлении колонки:', error)
            return false
        } finally {
            setIsWaitingAddColumn(false)
            resetValues()
        }
    }, [
        maxPosition,
        project.id,
        setProject,
        columnName,
        columnPosition,
        setIsWaitingAddColumn,
        validateValues,
        resetValues,
    ])

    return (
        <ModalSection
            title='Добавление колонки'
            onClick={handleAddColumnSubmit}
            isDisabled={isWaitingAddColumn}
            buttonTitle='Добавить'
            onClose={onClose}
        >
            <div className='row' style={{ gap: '25px' }}>
                <Field
                    id='columnName'
                    fieldClassName='full-width'
                    inputClassName='full-width'
                    label='Название'
                    type='text'
                    value={columnName}
                    onInput={onColumnNameInput}
                    error={errorColumnName}
                />
                <Field
                    id='columnPosition'
                    fieldClassName='full-width'
                    inputClassName='full-width'
                    label='Позиция на доске'
                    type='number'
                    min={1}
                    max={maxPosition}
                    value={columnPosition}
                    onInput={(event) => { setColumnPosition(event.target.value) }}
                />
            </div>
        </ModalSection>
    )
}

export default AddColumnSection
