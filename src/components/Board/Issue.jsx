import { useDraggable } from '@dnd-kit/core'
import { memo, useContext, useMemo } from 'react'
import { ProjectContext } from '../../context/Project/ProjectContext'
import lowestImg from '../../assets/img/issuePriority/lowest.png'
import lowImg from '../../assets/img/issuePriority/low.png'
import mediumImg from '../../assets/img/issuePriority/medium.png'
import highImg from '../../assets/img/issuePriority/high.png'
import highestImg from '../../assets/img/issuePriority/highest.png'
import bugImg from '../../assets/img/issueType/bug.png'
import taskImg from '../../assets/img/issueType/task.png'
import storyImg from '../../assets/img/issueType/story.png'
import investigationImg from '../../assets/img/issueType/investigation.png'

const issueTypesImg = {
    0: bugImg,
    1: storyImg,
    2: taskImg,
    3: investigationImg,
}

const issuePriorityImg = {
    0: lowestImg,
    1: lowImg,
    2: mediumImg,
    3: highImg,
    4: highestImg,
}

const Issue = ({ issue }) => {
    const { project } = useContext(ProjectContext)
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: issue.id,
    })

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
                <div className="issue_img-container">
                    <img
                        src={issueTypesImg[issue.issueType]}
                        width='14'
                        height='14'
                    />
                </div>
                <div
                    className={`issue_publicId ${issue.isDeleted ? `deleted` : ``}`}
                >
                    {`${project.shortName}-${issue.numberInProject}`}
                </div>
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