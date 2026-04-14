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

const SortableColumn = memo(({ column }) => {
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

    const handleEditColumnButton = useCallback(async () => {

    }, [])

    const handleDeleteColumnButton = useCallback(async () => {

    }, [])

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className='row' style={{ gap: '4px' }}>
                <Section className='column-position'>
                    {column.name}
                </Section>
                <Button
                    className='column-button-action'
                    onClick={handleEditColumnButton}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <Button
                    className='close column-button-action'
                    onClick={handleDeleteColumnButton}
                >
                    ✖
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