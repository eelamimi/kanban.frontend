import { useDraggable } from '@dnd-kit/core'
import { memo, useMemo } from 'react'
import bugImg from '../../assets/img/500x500.jpg'
import lowImg from '../../assets/img/500x500.jpg'
import highImg from '../../assets/img/500x500.jpg'
import taskImg from '../../assets/img/500x500.jpg'
import storyImg from '../../assets/img/500x500.jpg'
import mediumImg from '../../assets/img/500x500.jpg'
import minimalImg from '../../assets/img/500x500.jpg'
import criticalImg from '../../assets/img/500x500.jpg'
import investigationImg from '../../assets/img/500x500.jpg'

const issueTypesImg = {
    0: bugImg,
    1: storyImg,
    2: taskImg,
    3: investigationImg,
}

const issuePriorityImg = {
    0: minimalImg,
    1: lowImg,
    2: mediumImg,
    3: highImg,
    4: criticalImg,
}

const Issue = ({ issue, shortName }) => {
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
                <div className={`issue_publicId ${issue.isDeleted ? `deleted` : ``}`}>{`${shortName}-${issue.numberInProject}`}</div>
            </div>
            <div className='issue-row'>
                <div className={`issue_title ${issue.isDeleted ? `deleted` : ``}`}>{issue.title}</div>
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