import { useState, useCallback, useMemo, memo, useContext } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import Section from '../Section'
import Button from '../Button'
import Column from './Column'
import AddIssueModal from '../Modals/AddIssueModal'
import { ProjectContext } from '../../context/Project/ProjectContext'
import issueAPI from '../../api/issueAPI'
import Spinner from '../Spinner'

const Columns = () => {
    const { project, setProject, isLoadingFilters } = useContext(ProjectContext)
    const [allowedColumnIds, setAllowedColumnIds] = useState([])
    const [isAddIssueOpen, setIsAddIssueOpen] = useState(false)

    const issueToColumnMap = useMemo(() => {
        const map = new Map()
        for (const column of project.columns) {
            for (const issue of column.issues) {
                map.set(issue.id, column.id)
            }
        }
        return map
    }, [project.columns])

    const findColumnByIssueId = useCallback((issueId) => {
        return issueToColumnMap.get(issueId) || null
    }, [issueToColumnMap])

    const handleDragStart = useCallback((event) => {
        const { active } = event
        const issueId = active.id
        const sourceColumnId = findColumnByIssueId(issueId)
        const sourceColumn = project.columns.find(col => col.id === sourceColumnId)

        if (sourceColumn?.nextColumns) {
            setAllowedColumnIds(sourceColumn.nextColumns)
        } else {
            setAllowedColumnIds([])
        }
    }, [project.columns, findColumnByIssueId])

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

        const sourceColumn = project.columns.find(col => col.id === sourceColumnId)
        const targetColumn = project.columns.find(col => col.id === targetColumnId)
        const movedIssue = sourceColumn.issues.find(issue => issue.id === issueId)

        if (!movedIssue) {
            setAllowedColumnIds([])
            return
        }

        const prevProject = project

        const updatedIssue = {
            ...movedIssue,
            isDeleted: targetColumn.position === (project.columns.length - 1)
        }

        const newColumns = project.columns.map(col => {
            if (col.id === sourceColumnId) {
                return {
                    ...col,
                    issues: col.issues.filter(issue => issue.id !== issueId)
                }
            }
            if (col.id === targetColumnId) {
                return {
                    ...col,
                    issues: [...col.issues, updatedIssue].sort((a, b) => a.numberInProject - b.numberInProject)
                }
            }
            return col
        })

        setAllowedColumnIds([])
        setProject(prev => ({
            ...prev,
            columns: newColumns
        }))

        try {
            await issueAPI.moveIssue({
                IssueId: issueId,
                SourceColumnId: sourceColumnId,
                TargetColumnId: targetColumnId,
            })
        } catch (error) {
            console.error('Ошибка при перемещении задачи:', error)
            setProject(prevProject)
        }
    }, [project, setProject, allowedColumnIds, findColumnByIssueId])

    if (isLoadingFilters)
        return (
            <Section className='full-width'>
                <Spinner />
            </Section>
        )

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
                        Добавить
                    </Button>
                    <AddIssueModal
                        isOpen={isAddIssueOpen}
                        onClose={() => setIsAddIssueOpen(false)}
                    />
                </div>
                <div className='columns'>
                    {project.columns.map((column) => (
                        <Column
                            key={column.id}
                            column={column}
                            canDropHere={allowedColumnIds.includes(column.id)}
                        />
                    ))}
                </div>
            </Section>
        </DndContext>
    )
}

export default memo(Columns)