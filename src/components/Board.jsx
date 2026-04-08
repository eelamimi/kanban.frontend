import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import projectAPI from '../api/projectAPI'
import Filters from './Board/Filters'
import Columns from './Board/Columns'
import Section from './Section'
import Spinner from './Spinner'
import Span from './Span'
import Button from './Button'
import EditBoardModal from './Modals/EditBoardModal'

const Board = () => {
    const { projectId } = useParams()
    const [isLoadingProject, setIsLoadingProject] = useState(true)
    const [isEditBoardOpen, setIsEditBoardOpen] = useState(false)
    const [project, setProject] = useState(null)

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
            <Section className={'full-width'}>
                <div className='subsection'>
                    <div className="h1">{`${project.name} (${project.shortName})`}</div>
                    <Button
                        className='left'
                        onClick={() => setIsEditBoardOpen(true)}
                    >
                        Редактировать доску
                    </Button>
                    <EditBoardModal
                        isOpen={isEditBoardOpen}
                        onClose={() => setIsEditBoardOpen(false)}
                    />
                </div>

                <Span value={project.description} />
                <Filters
                    filters={project.members}
                />
            </Section>
            <Columns
                shortName={project.shortName}
                projectId={projectId}
                members={project.members}
                columns={project.columns}
            />
        </>
    )
}

export default memo(Board)