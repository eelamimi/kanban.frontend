import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router'
import projectAPI from '../api/projectAPI'
import columnAPI from '../api/columnAPI'

export const useProject = () => {
    const { projectId } = useParams()
    const [isLoadingProject, setIsLoadingProject] = useState(true)
    const [project, setProject] = useState(null)

    const updateTransitions = useCallback(async (fromColumnId, toColumnId, isTransitionAllowed) => {
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
    }, [project])

    useEffect(() => {
        async function fetchProject(projectId) {
            try {
                const response = await projectAPI.getProject(projectId)
                setProject(response)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setIsLoadingProject(false)
            }
        }

        fetchProject(projectId)
    }, [projectId])

    return {
        project,
        setProject,
        isLoadingProject,
        updateTransitions
    }
}