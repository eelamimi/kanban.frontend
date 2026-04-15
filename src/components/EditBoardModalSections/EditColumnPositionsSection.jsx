import {
    closestCenter,
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay
} from '@dnd-kit/core'
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
    useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { memo, useCallback, useContext, useState, useMemo } from 'react'
import { ProjectContext } from '../../context/Project/ProjectContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import columnAPI from '../../api/columnAPI'
import ModalSection from '../ModalSection'
import Section from '../Section'
import Button from '../Button'
import Field from '../Field'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'

const SortableColumn = memo(({ column }) => {
    const { project, setProject } = useContext(ProjectContext)
    const [columnName, setColumnName] = useState(column.name)
    const [errorColumnName, setErrorColumnName] = useState('')
    const [isEditingNameColumn, setIsEditingNameColumn] = useState(false)
    const [isWaitingDeleteColumn, setIsWaitingDeleteColumn] = useState(false)
    const [isWaitingEditColumnName, setIsWaitingEditColumnName] = useState(false)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: column.id })

    const style = useMemo(() => ({
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab'
    }), [transform, transition, isDragging])

    const onColumnNameInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setColumnName(value)
        setErrorColumnName(hasOnlySpaces || value.length === 0 ? 'Название обязательно' : '')
    }, [])

    const isValid = useCallback(() => {
        if (column.name === columnName)
            return false

        const clearValue = columnName.trim()
        const hasOnlySpaces = columnName.length > 0 && clearValue.length === 0
        if (hasOnlySpaces || columnName.length === 0)
            return false

        return true
    }, [column.name, columnName])

    const handleEditColumnButton = useCallback(async () => {
        if (isEditingNameColumn) {
            if (!isValid()) {
                setIsEditingNameColumn(false)
                return
            }

            setIsWaitingEditColumnName(true)
            const previousProject = project
            const oldColumnName = column.name
            const newColumnName = columnName.trim()

            setProject(prev => ({
                ...prev,
                columns: prev.columns.map(col =>
                    col.id === column.id
                        ? { ...col, name: newColumnName }
                        : col
                )
            }))
            setColumnName(newColumnName)

            try {
                await columnAPI.update({
                    Id: column.id,
                    Name: newColumnName
                })
            } catch (error) {
                console.error('Ошибка при обновлении имена колонки:', error)
                setProject(previousProject)
                setColumnName(oldColumnName)
            }
            finally {
                setIsWaitingEditColumnName(false)
            }
        }

        setIsEditingNameColumn(!isEditingNameColumn)
    }, [isEditingNameColumn, isValid, project, column.name, column.id, columnName, setProject])

    const handleDeleteColumnButton = useCallback(async () => {
        setIsWaitingDeleteColumn(true)

        const previousProject = project
        setProject(prev => ({
            ...prev,
            columns: prev.columns.filter(col => col.id !== column.id)
        }))

        try {
            await columnAPI.delete({
                Id: column.id
            })
        } catch (error) {
            console.error('Ошибка при удалении колонки:', error)
            setProject(previousProject)
        }
        finally {
            setIsWaitingDeleteColumn(false)
        }
    }, [column.id, project, setProject])

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className='row' style={{ gap: '6px' }}>
                <Section className={`column-position ${isEditingNameColumn ? `editing-column-name` : ``}`}>
                    {isEditingNameColumn
                        ? <Field
                            id='columnNameEdit'
                            fieldClassName='column-name-edit'
                            type='text'
                            value={columnName}
                            onInput={onColumnNameInput}
                            error={errorColumnName}
                        />
                        : column.name
                    }
                </Section>
                <Button
                    className='column-button-action'
                    onClick={handleEditColumnButton}
                    isDisabled={isWaitingEditColumnName}
                >
                    {isEditingNameColumn
                        ? <FontAwesomeIcon icon={faCheck} />
                        : <FontAwesomeIcon icon={faPenToSquare} />
                    }
                </Button>
                <Button
                    className='close column-button-action'
                    onClick={handleDeleteColumnButton}
                    isDisabled={isWaitingDeleteColumn || project.columns.length <= 3}
                >
                    <FontAwesomeIcon icon={faX} />
                </Button>
            </div>
        </div>
    )
})

const EditColumnPositionsSection = () => {
    const { project, setProject } = useContext(ProjectContext)
    const [activeId, setActiveId] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    )

    const handleDragStart = useCallback((event) => {
        setActiveId(event.active.id)
    }, [setActiveId])

    const handleDragEnd = useCallback(async (event) => {
        const { active, over } = event

        setActiveId(null)

        if (active.id !== over?.id) {
            const oldIndex = project.columns.findIndex(col => col.id === active.id)
            const newIndex = project.columns.findIndex(col => col.id === over.id)

            const newColumns = arrayMove(project.columns, oldIndex, newIndex)

            const prevColumns = project.columns
            const updatedColumns = newColumns.map((col, index) => ({
                ...col,
                position: index
            }))

            setProject(prev => ({
                ...prev,
                columns: updatedColumns
            }))

            try {
                await columnAPI.updatePosition({
                    ColumnId: active.id,
                    NewPosition: newIndex,
                })
            } catch (error) {
                console.error('Ошибка при редактировании позиций колон:', error)
                setProject(prev => ({
                    ...prev,
                    columns: prevColumns
                }))
            }
        }
    }, [project.columns, setProject])

    const handleDragCancel = useCallback(() => {
        setActiveId(null)
    }, [setActiveId])

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            sensors={sensors}
        >
            <SortableContext
                items={project.columns.map(col => col.id)}
                strategy={verticalListSortingStrategy}
            >
                <ModalSection title='Редактирование позиций колонок'>
                    <div className='column' style={{ gap: '6px' }}>
                        {project.columns.map((column) => (
                            <SortableColumn
                                key={column.id}
                                column={column}
                            />
                        ))}
                    </div>
                </ModalSection>
            </SortableContext>
            <DragOverlay>
                {activeId ? (
                    <Section className='columnName' style={{ opacity: 0.8 }}>
                        {project.columns.find(col => col.id === activeId)?.name}
                    </Section>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}

export default memo(EditColumnPositionsSection)