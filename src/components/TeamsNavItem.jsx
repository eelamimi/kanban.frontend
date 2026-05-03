import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import SelectField from './SelectField'
import { UserInfoContext } from '../context/UserInfo/UserInfoContext'
import { useParams, useSearchParams } from 'react-router'

const TeamsNavItem = () => {
    const { teams } = useContext(UserInfoContext)
    const { projectId } = useParams()
    const [searchParams] = useSearchParams()
    const projectIdFromUrl = searchParams.get('projectId')
    const effectiveProjectId = projectId || projectIdFromUrl
    const [link, setLink] = useState(null)

    const defaultProject = useMemo(() => {
        if (!teams || !effectiveProjectId) return null
        const foundProject = teams
            .flatMap(team => team.projects)
            .find(p => p.id === effectiveProjectId)

        return foundProject ? {
            label: foundProject.name,
            value: foundProject.id,
        } : null
    }, [teams, effectiveProjectId])

    const options = useMemo(() => {
        if (!teams) return []

        return teams.map(team => ({
            label: team.name,
            options: team.projects.map(project => ({
                value: project.id,
                label: project.name,
                isOnly: team.projects.length === 1
            }))
        }))
    }, [teams])

    const handleLinkChange = useCallback((selected) => {
        window.location.href = `/projects/${selected.value}`
    }, [])

    useEffect(() => {
        setLink(defaultProject)
    }, [defaultProject])

    return (
        <div className='nav-item nav-teams'>
            <SelectField
                fieldClassName='no-margin-bottom'
                placeholder=''
                options={options}
                value={link}
                onChange={handleLinkChange}
            />
        </div>
    )
}

export default memo(TeamsNavItem)