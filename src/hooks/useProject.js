import baseAvatar from '../assets/img/default_avatar.jpg'
import { useState, useEffect, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router'
import projectAPI from '../api/projectAPI'
import { ProjectContext } from '../context/Project/ProjectContext'
import AuthService from '../service/AuthService'

export const useProject = () => {
    const { projectId } = useParams()
    const [searchParams] = useSearchParams()
    const projectIdFromUrl = searchParams.get('projectId')
    const [isLoadingProject, setIsLoadingProject] = useState(true)
    const [project, setProject] = useState(null)
    const userProfileId = useMemo(() => {
        const info = AuthService.getUserInfo()
        return info?.userProfileId ?? null
    }, [])

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
        if (!memberIdOptions.length || !userProfileId) return null
        return memberIdOptions.find(member => member.value === userProfileId)
    }, [memberIdOptions, userProfileId])

    useEffect(() => {
        async function fetchProject(projectId) {
            try {
                const response = await projectAPI.get(projectId)
                setProject(response)
                setIsLoadingProject(false)
            }
            catch (error) {
                console.error('Error fetching project:', error)
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
