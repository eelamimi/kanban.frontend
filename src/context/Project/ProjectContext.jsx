/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react'
import { useProject } from '../../hooks/useProject'

export const ProjectContext = createContext({})

const ProjectProvider = ({ children }) => {
    const {
        project,
        setProject,
        isLoadingProject,
        memberIdOptions,
        curUser
    } = useProject()

    return (
        <ProjectContext.Provider
            value={{
                project,
                setProject,
                isLoadingProject,
                memberIdOptions,
                curUser
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectProvider
