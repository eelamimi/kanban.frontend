import { useProject } from '../../hook/useProject'
import { ProjectContext } from './ProjectContext'

const ProjectProvider = ({ children }) => {
    const {
        project,
        setProject,
        isLoadingProject,
    } = useProject()

    return (
        <ProjectContext.Provider
            value={{
                project,
                setProject,
                isLoadingProject,
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectProvider