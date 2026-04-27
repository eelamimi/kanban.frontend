import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router'
import projectAPI from '../api/projectAPI'

export const useProject = () => {
    const { projectId } = useParams()
    const [searchParams] = useSearchParams()
    const projectIdFromUrl = searchParams.get('projectId')
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

        fetchProject(projectId || projectIdFromUrl)
    }, [projectId, projectIdFromUrl])

    return {
        project,
        setProject,
        isLoadingProject,
    }
}