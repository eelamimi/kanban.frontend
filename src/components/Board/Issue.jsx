import { useDraggable } from '@dnd-kit/core'
import { memo, useMemo } from 'react'

const issueTypesImg = {
    0: '../../assets/img/bug.png',
    1: '../../assets/img/story.png',
    2: '../../assets/img/task.png',
    3: '../../assets/img/investigation.png',
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
            <div
                className='row'
                style={{
                    alignItems: 'center',
                    alignContent: 'center',
                }}
            >
                <div className="issue_type">
                    <img
                        src={issueTypesImg[issue.issueType]}
                        width='16'
                        height='16'
                    />
                </div>
                <div className={`issue_publicId ${issue.isDeleted ? `deleted` : ``}`}>{`${shortName}-${issue.numberInProject}`}</div>
            </div>
            <div className='issue_title'>{issue.title}</div>
            <div className='row'>
                <div className='issue_storyPoints'>{issue.storyPoints}</div>
                <div className='issue_priority'>{issue.issuePriority}</div>
            </div>
        </div>
    )
}

export default memo(Issue)