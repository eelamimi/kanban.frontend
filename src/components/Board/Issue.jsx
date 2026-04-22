import { useDraggable } from '@dnd-kit/core'
import { memo, useContext, useMemo } from 'react'
import { ProjectContext } from '../../context/Project/ProjectContext'
import { Link } from 'react-router'
import { issuePriorityImg, issueTypesImg } from '../../consts/issueConsts'

const Issue = ({ issue }) => {
    const { project } = useContext(ProjectContext)
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: issue.id,
    })
    const issuePublicId = `${project.shortName}-${issue.numberInProject}`

    const style = useMemo(() => {
        return {
            transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
            opacity: isDragging ? 0.5 : 1,
            cursor: 'grab',
        }
    }, [transform, isDragging])

    return (
        <div
            ref={setNodeRef}
            className='issue'
            style={style}
            {...listeners}
            {...attributes}
        >
            <div className='issue-row'>
                <div className='issue_img-container'>
                    <img
                        src={issueTypesImg[issue.issueType]}
                        width='14'
                        height='14'
                    />
                </div>
                <Link
                    className={`issue_publicId ${issue.isDeleted ? `deleted` : ``}`}
                    to={`/issue/${issuePublicId}?projectId=${project.id}`}
                >
                    {issuePublicId}
                </Link>
            </div>
            <div className='issue-row'>
                <div className='issue_title'>{issue.title}</div>
            </div>
            <div className='issue-row last'>
                <div className='issue_img-container'>
                    <img
                        src={issuePriorityImg[issue.issuePriority]}
                        width='14'
                        height='14'
                    />
                </div>
                <div className='issue_storyPoints'>{issue.storyPoints}</div>
            </div>
        </div>
    )
}

export default memo(Issue)