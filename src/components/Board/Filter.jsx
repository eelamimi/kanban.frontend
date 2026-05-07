import { useNavigate, useSearchParams } from 'react-router'
import { memo, useCallback, useContext } from 'react'
import { ProjectContext } from '../../context/Project/ProjectContext'
import Button from '../Button'

const Filter = ({ member, isAssignee = false }) => {
    const { updateIssues } = useContext(ProjectContext)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

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
            className='filter'
            title={`${member.firstName} ${member.secondName}`}
            onClick={updateParams}
        >
            {member.firstName}
        </Button>
    )
}

export default memo(Filter)