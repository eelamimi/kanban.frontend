import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import projectAPI from '../api/projectAPI'

export const useProject = () => {
    const { projectId } = useParams()
    const [isLoadingProject, setIsLoadingProject] = useState(true)
    const [project, setProject] = useState(null)

    useEffect(() => {
        async function fetchProject(projectId) {
            try {
                const response = await projectAPI.get(projectId)
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
    }
}