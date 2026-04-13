import { useProject } from '../../hook/useProject'
import { ProjectContext } from './ProjectContext'

const ProjectProvider = ({ children }) => {
    const {
        project,
        setProject,
        isLoadingProject,
        updateTransitions
    } = useProject()

    return (
        <ProjectContext.Provider
            value={{
                project,
                setProject,
                isLoadingProject,
                updateTransitions,
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectProvider