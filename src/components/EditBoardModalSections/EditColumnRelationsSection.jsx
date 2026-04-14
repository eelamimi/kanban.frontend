import { memo, useContext, useCallback, useMemo } from 'react'
import { ProjectContext } from '../../context/Project/ProjectContext'
import ModalSection from '../ModalSection'
import columnAPI from '../../api/columnAPI'

const EditColumnRelationsSection = () => {
    const { project, setProject } = useContext(ProjectContext)

    const onUpdateTransitions = useCallback(async (fromColumnId, toColumnId, isTransitionAllowed) => {
        const prevProject = project

        setProject(prevProject => ({
            ...prevProject,
            columns: prevProject.columns.map(column => {
                if (column.id === fromColumnId)
                    if (isTransitionAllowed)
                        return {
                            ...column,
                            nextColumns: [...column.nextColumns, toColumnId]
                        }
                    else
                        return {
                            ...column,
                            nextColumns: column.nextColumns.filter(id => id !== toColumnId)
                        }

                return column
            })
        }))

        try {
            await columnAPI.updateRelation({
                FromColumnId: fromColumnId,
                ToColumnId: toColumnId,
                IsTransitionAllowed: isTransitionAllowed,
            })
        } catch (error) {
            console.error('Ошибка при редактировании связей колон:', error)
            setProject(prevProject)
        }
    }, [project, setProject])

    return (
        <ModalSection title='Редактирование связей'>
            <TransitionMatrix
                project={project}
                onUpdateTransitions={onUpdateTransitions}
            />
        </ModalSection>
    )
}

export default memo(EditColumnRelationsSection)

const TransitionMatrix = ({ project, onUpdateTransitions }) => {
    const transitions = useMemo(() => {
        const matrix = {}
        project.columns.forEach(fromColumn => {
            matrix[fromColumn.id] = {}
            project.columns.forEach(toColumn => {
                matrix[fromColumn.id][toColumn.id] =
                    fromColumn.nextColumns?.includes(toColumn.id) || false
            })
        })
        return matrix
    }, [project.columns])

    const toggleTransition = useCallback((fromColumnId, toColumnId) => {
        const isTransitionAllowed = !transitions[fromColumnId]?.[toColumnId]
        onUpdateTransitions(fromColumnId, toColumnId, isTransitionAllowed)
    }, [transitions, onUpdateTransitions])

    return (
        <div className='transition-matrix'>
            <div style={{ borderRadius: '4px', overflow: 'hidden' }}>
                <table className='matrix-table'>
                    <thead>
                        <tr>
                            <th>Из \ В</th>
                            {project.columns.map(toColumn => (
                                <th key={toColumn.id}>{toColumn.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {project.columns.map(fromColumn => (
                            <tr key={fromColumn.id}>
                                <td className='from-column'>
                                    <strong>{fromColumn.name}</strong>
                                </td>
                                {project.columns.map(toColumn => {
                                    const isSameColumn = fromColumn.id === toColumn.id
                                    const isAllowed = transitions[fromColumn.id]?.[toColumn.id]
                                    return (
                                        <td key={toColumn.id} className='matrix-cell'>
                                            {!isSameColumn ? (
                                                <input
                                                    type='checkbox'
                                                    checked={isAllowed}
                                                    onChange={() => toggleTransition(fromColumn.id, toColumn.id)}
                                                    className='transition-checkbox'
                                                />
                                            ) : (
                                                <span className='self-transition'>—</span>
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}