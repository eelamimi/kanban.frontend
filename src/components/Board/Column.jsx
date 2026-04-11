import { useDroppable } from '@dnd-kit/core'
import Section from '../Section'
import Issue from './Issue'
import { memo } from 'react'

const Column = ({ column, canDropHere = false }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    })

    return (
        <div ref={setNodeRef} className="column">
            <Section className='columnName'>
                {column.name}
            </Section>
            <Section className={`issues ${canDropHere ? `highlight` : ``}`}>
                {column.issues.map((issue) => (
                    <Issue
                        key={issue.id}
                        issue={issue}
                    />
                ))}
            </Section>
        </div>
    )
}

export default memo(Column)