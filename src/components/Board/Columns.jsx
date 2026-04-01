import { useParams } from 'react-router'
import Section from '../Section'
import { useEffect, useState } from 'react'
import projectsAPI from '../../api/projectAPI'

const Columns = () => {
    const { projectId } = useParams()
    const [isLoadingProject, setIsLoadingProject] = useState(true)
    const [project, setProject] = useState(null)

    useEffect(() => {
        async function fetchProject(projectId) {
            try {
                const response = projectsAPI.getProject(projectId)
                console.log(response)
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

    return (
        <Section className={'full-width'}>
            <span>Columns</span>
        </Section>
    )
}

export default Columns