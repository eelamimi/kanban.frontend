import { useState, useCallback, useMemo, memo } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import Section from '../Section'
import Button from '../Button'
import Column from './Column'
import AddIssueModal from '../AddIssueModal'
import projectAPI from '../../api/projectAPI'

const Columns = ({ projectId, shortName, members, columns: initialColumns }) => {
    const [allowedColumnIds, setAllowedColumnIds] = useState([])
    const [isAddIssueOpen, setIsAddIssueOpen] = useState(false)
    const [columns, setColumns] = useState(initialColumns)

    const issueToColumnMap = useMemo(() => {
        const map = new Map()
        for (const column of columns) {
            for (const issue of column.issues) {
                map.set(issue.id, column.id)
            }
        }
        return map
    }, [columns])

    const findColumnByIssueId = useCallback((issueId) => {
        return issueToColumnMap.get(issueId) || null
    }, [issueToColumnMap])

    const handleDragStart = useCallback((event) => {
        const { active } = event
        const issueId = active.id
        const sourceColumnId = findColumnByIssueId(issueId)
        const sourceColumn = columns.find(col => col.id === sourceColumnId)

        if (sourceColumn?.nextColumns) {
            setAllowedColumnIds(sourceColumn.nextColumns)
        } else {
            setAllowedColumnIds([])
        }
    }, [columns, findColumnByIssueId])

    const handleDragEnd = useCallback(async (event) => {
        const { active, over } = event
        const issueId = active.id
        const sourceColumnId = findColumnByIssueId(issueId)
        const targetColumnId = over.id

        if (sourceColumnId === targetColumnId ||
            !allowedColumnIds.includes(targetColumnId)) {
            setAllowedColumnIds([])
            return
        }

        const sourceColumn = columns.find(col => col.id === sourceColumnId)
        const movedIssue = sourceColumn.issues.find(issue => issue.id === issueId)

        if (!movedIssue) {
            setAllowedColumnIds([])
            return
        }

        const previousColumns = columns

        const targetColumnPosition = columns.find(col => col.id === targetColumnId).position
        movedIssue.isDeleted = targetColumnPosition === (columns.length - 1)

        const newColumns = columns.map(col => {
            if (col.id === sourceColumnId) {
                return {
                    ...col,
                    issues: col.issues.filter(issue => issue.id !== issueId)
                }
            }
            if (col.id === targetColumnId) {
                return {
                    ...col,
                    issues: [...col.issues, movedIssue].sort((a, b) => a.numberInProject - b.numberInProject)
                }
            }
            return col
        })

        setAllowedColumnIds([])
        setColumns(newColumns)

        try {
            await projectAPI.moveIssue({
                IssueId: issueId,
                SourceColumnId: sourceColumnId,
                TargetColumnId: targetColumnId,
            });
        } catch (error) {
            console.error('Ошибка при перемещении задачи:', error);
            setColumns(previousColumns);
        }
    }, [columns, allowedColumnIds, findColumnByIssueId])

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
        >
            <Section className='full-width'>
                <div className='subsection'>
                    <div className='h1'>Доска</div>
                    <Button
                        className='left'
                        onClick={() => setIsAddIssueOpen(true)}
                    >
                        Добавить проблему
                    </Button>
                    <AddIssueModal
                        projectId={projectId}
                        members={members}
                        setColumns={setColumns}
                        isOpen={isAddIssueOpen}
                        onClose={() => setIsAddIssueOpen(false)}
                    />
                </div>
                <div className='columns'>
                    {columns.map((column) => (
                        <Column
                            key={column.id}
                            column={column}
                            shortName={shortName}
                            canDropHere={allowedColumnIds.includes(column.id)}
                        />
                    ))}
                </div>
            </Section>
        </DndContext>
    )
}

export default memo(Columns)