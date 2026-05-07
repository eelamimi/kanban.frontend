import { useNavigate, useSearchParams } from 'react-router'
import { memo, useCallback, useContext, useMemo } from 'react'
import { ProjectContext } from '../../context/Project/ProjectContext'
import Button from '../Button'

const Filter = ({ member, isAssignee = false }) => {
    const { updateIssues } = useContext(ProjectContext)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const isActive = useMemo(() => {
        const paramValue = isAssignee
            ? searchParams.get('assignee')
            : searchParams.get('author')
        return paramValue === member.id
    }, [searchParams, member.id, isAssignee])

    const updateParams = useCallback(async () => {
        const currentAuthor = searchParams.get('author')
        const currentAssignee = searchParams.get('assignee')
        const params = new URLSearchParams(searchParams)

        if (isAssignee)
            if (currentAssignee === member.id)
                params.delete('assignee')
            else
                params.set('assignee', member.id)
        else
            if (currentAuthor === member.id)
                params.delete('author')
            else
                params.set('author', member.id)

        navigate(`?${params.toString()}`, { replace: true })
        await updateIssues()
    }, [isAssignee, searchParams, member.id, navigate, updateIssues])

    return (
        <Button
            className={`filter ${isActive ? 'activated' : ''}`}
            title={`${member.firstName} ${member.secondName}`}
            onClick={updateParams}
        >
            {member.firstName}
        </Button>
    )
}

export default memo(Filter)