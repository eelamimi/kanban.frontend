import baseAvatar from '../assets/img/default_avatar.jpg'
import { useState, useEffect, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router'
import projectAPI from '../api/projectAPI'
import { ProjectContext } from '../context/Project/ProjectContext'
import AuthService from '../service/AuthService'
import { showError } from '../utils/errorHandler'

const userProfileId = AuthService.getUserInfo().userProfileId

export const useProject = () => {
    const { projectId } = useParams()
    const [searchParams] = useSearchParams()
    const projectIdFromUrl = searchParams.get('projectId')
    const [isLoadingProject, setIsLoadingProject] = useState(true)
    const [project, setProject] = useState(null)

    const memberIdOptions = useMemo(() => {
        if (!project?.members) return []
        return project.members.map((member) => ({
            value: member.id,
            label: `${member.firstName} ${member.secondName}`,
            img: !member.avatar ? baseAvatar : `data:image/jpeg;base64,${member.avatar}`,
            imgClassName: 'member-avatar-option'
        }))
    }, [project.members])

    const curUser = useMemo(() => {
        if (!memberIdOptions.length) return null
        return memberIdOptions.find(member => member.value === userProfileId)
    }, [memberIdOptions])

    useEffect(() => {
        async function fetchProject(projectId) {
            try {
                const response = await projectAPI.get(projectId)
                setProject(response)
                setIsLoadingProject(false)
            }
            catch (error) {
                showError(error.message)
            }
        }

        fetchProject(projectId || projectIdFromUrl)
    }, [projectId, projectIdFromUrl])

    return {
        project,
        setProject,
        isLoadingProject,
        memberIdOptions,
        curUser,
    }
}