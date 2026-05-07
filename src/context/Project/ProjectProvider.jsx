import { useProject } from '../../hook/useProject'
import { ProjectContext } from './ProjectContext'

const ProjectProvider = ({ children }) => {
    const {
        project,
        setProject,
        isLoadingProject,
        memberIdOptions,
        curUser,
        isLoadingFilters,
        updateIssues,
    } = useProject()

    return (
        <ProjectContext.Provider
            value={{
                project,
                setProject,
                isLoadingProject,
                memberIdOptions,
                curUser,
                isLoadingFilters,
                updateIssues,
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectProvider