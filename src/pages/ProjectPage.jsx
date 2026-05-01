import Board from '../components/Board'
import ProjectProvider from '../context/Project/ProjectContext'

const ProjectPage = () => {
    return (
        <ProjectProvider>
            <Board />
        </ProjectProvider>
    )
}

export default ProjectPage