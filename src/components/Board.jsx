import { memo, useContext, useState } from 'react'
import Filters from './Board/Filters'
import Columns from './Board/Columns'
import Section from './Section'
import Spinner from './Spinner'
import Span from './Span'
import Button from './Button'
import EditBoardModal from './Modals/EditBoardModal'
import { ProjectContext } from '../context/Project/ProjectContext'

const Board = () => {
    const {
        project,
        isLoadingProject
    } = useContext(ProjectContext)
    const [isEditBoardOpen, setIsEditBoardOpen] = useState(false)

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
                    <div className='h1'>{`${project.name} (${project.shortName})`}</div>
                    <Button
                        className='left'
                        onClick={() => setIsEditBoardOpen(true)}
                    >
                        Редактировать
                    </Button>
                    <EditBoardModal
                        isOpen={isEditBoardOpen}
                        onClose={() => setIsEditBoardOpen(false)}
                    />
                </div>
                <Span className='multiline' value={project.description} />
                <Filters />
            </Section>
            <Columns />
        </>
    )
}

export default memo(Board)