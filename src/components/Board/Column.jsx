import { useDroppable } from '@dnd-kit/core';
import Section from '../Section';
import Issue from './Issue';

const Column = ({ column }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <div ref={setNodeRef} className="column">
            <Section className='columnName'>
                {column.name}
            </Section>
            <Section className='issues'>
                {column.issues.map((issue) => (
                    <Issue issue={issue} key={issue.id} />
                ))}
            </Section>
        </div>
    );
};

export default Column;