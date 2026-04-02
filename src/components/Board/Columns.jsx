import { useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import Section from '../Section'
import Button from '../Button'
import Column from './Column'
import AddIssueModal from '../AddIssueModal'

const Columns = ({ columns: initialColumns }) => {
    const [isAddIssueOpen, setIsAddIssueOpen] = useState(false)
    const [columns, setColumns] = useState(initialColumns)

    function handleDragEnd(event) {
        const { active, over } = event

        // const issueId = active.id
        // const sourceColumnId = findColumnByIssueId(issueId)
        // const targetColumnId = over.id

        // if (sourceColumnId === targetColumnId)
        //     return

        // const issueId = active.id
        // const sourceColumnId = findColumnByIssueId(issueId)
        // const targetColumnId = over.id

        // if (sourceColumnId === targetColumnId) return

        // // Находим issue и перемещаем
        // const sourceColumn = columns.find(col => col.id === sourceColumnId)
        // const targetColumn = columns.find(col => col.id === targetColumnId)

        // const movedIssue = sourceColumn.issues.find(issue => issue.id === issueId)

        // if (!movedIssue) return

        // // Создаем новые колонки
        // const newColumns = columns.map(col => {
        //     if (col.id === sourceColumnId) {
        //         return {
        //             ...col,
        //             issues: col.issues.filter(issue => issue.id !== issueId)
        //         }
        //     }
        //     if (col.id === targetColumnId) {
        //         return {
        //             ...col,
        //             issues: [...col.issues, movedIssue]
        //         }
        //     }
        //     return col
        // })

        // setColumns(newColumns)
    }

    function findColumnByIssueId(issueId) {
        for (const column of columns) {
            if (column.issues.some(issue => issue.id === issueId)) {
                return column.id
            }
        }
        return null
    }

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
        >
            <Section className='full-width'>
                <div className='subsection'>
                    <div className="h1">Доска</div>
                    <Button
                        className='left'
                        onClick={() => setIsAddIssueOpen(true)}
                    >
                        Добавить задачу
                    </Button>
                    <AddIssueModal
                        isOpen={isAddIssueOpen}
                        onClose={() => {
                            console.log('onClose')
                            setIsAddIssueOpen(false)
                        }}
                    />
                </div>
                <div className="columns">
                    {columns.map((column) => (
                        <Column column={column} key={column.id} />
                    ))}
                </div>
            </Section>
        </DndContext>
    )
}

export default Columns