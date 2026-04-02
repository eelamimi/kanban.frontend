import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import projectsAPI from '../api/projectAPI'
import Filters from './Board/Filters'
import Columns from './Board/Columns'
import Section from './Section'
import Spinner from './Spinner'
import Span from './Span'

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
                <Section className={'full-width'}>
                    <Spinner />
                </Section>
            </>
        )
    }
    project.columns.map((c) => (c.issues = [
        { id: `${c.name}1`, title: 'title1' },
        { id: `${c.name}2`, title: 'title2' },
        { id: `${c.name}3`, title: 'title3' },
        { id: `${c.name}4`, title: 'title4' },
        { id: `${c.name}5`, title: 'title5' },
        { id: `${c.name}6`, title: 'title6' },
    ]))
    return (
        <>
            <Section className={'full-width'}>
                <div className='subsection'>
                    <div className="h1">{`${project.name} (${project.shortName})`}</div>
                </div>
                <Span value={project.description} />
                <Filters
                    filters={project.filters}
                />
            </Section>
            <Columns
                columns={project.columns}
            />
        </>
    )
}

export default Board