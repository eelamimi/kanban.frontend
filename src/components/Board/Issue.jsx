import { useDraggable } from '@dnd-kit/core';

const Issue = ({ issue }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: issue.id,
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
    };

    return (
        <div
            ref={setNodeRef}
            className='issue'
            style={style}
            {...listeners}
            {...attributes}
        >
            {issue.title}
        </div>
    );
};

export default Issue;