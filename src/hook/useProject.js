import baseAvatar from '../assets/img/default_avatar.jpg'
import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router'
import projectAPI from '../api/projectAPI'
import { ProjectContext } from '../context/Project/ProjectContext'
import AuthService from '../service/AuthService'

const userProfileId = AuthService.getUserInfo().userProfileId

export const useProject = () => {
    const { projectId } = useParams()
    const [searchParams] = useSearchParams()
    const projectIdFromUrl = searchParams.get('projectId')
    const [isLoadingProject, setIsLoadingProject] = useState(true)
    const [project, setProject] = useState(null)
    const [curUser, setCurUser] = useState(null)
    const [memberIdOptions, setMemberIdOptions] = useState([])

    useEffect(() => {
        async function fetchProject(projectId) {
            try {
                const response = await projectAPI.get(projectId)
                setProject(response)
                setMemberIdOptions(project.members.map((member) => ({
                    value: member.id,
                    label: `${member.firstName} ${member.secondName}`,
                    img: member.avatar === "" ? baseAvatar : member.avatar,
                    imgClassName: 'member-avatar-option'
                })) ?? [])
                setCurUser(memberIdOptions.find(member => member.value === userProfileId))
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setIsLoadingProject(false)
            }
        }

        fetchProject(projectId || projectIdFromUrl)
    }, [project?.members, memberIdOptions, projectId, projectIdFromUrl])

    return {
        project,
        setProject,
        isLoadingProject,
        memberIdOptions,
        curUser,
    }
}