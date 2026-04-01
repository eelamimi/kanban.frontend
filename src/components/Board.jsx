import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BoardFilters from './Board/BoardFilters'
import Columns from './Board/Columns'
import projectsAPI from '../api/projectAPI'
import Section from './Section'
import Spinner from './Spinner'

const Board = () => {
    const { projectId } = useParams()
    const [isLoadingProject, setIsLoadingProject] = useState(true)
    const [project, setProject] = useState(null)

    useEffect(() => {
        async function fetchProject(projectId) {
            try {
                const response = await projectsAPI.getProject(projectId)
                console.log(response)
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

    if (isLoadingProject) {
        return (
            <>
                <Section className={'full-width'}>
                    <Spinner />
                </Section>
                <Section className={'full-width'}>
                    <Spinner />
                </Section>
            </>
        )
    }

    return (
        <>
            <BoardFilters
                filters={project.filters}
            />
            <Columns
                columns={project.columns}
            />
        </>
    )
}

export default Board