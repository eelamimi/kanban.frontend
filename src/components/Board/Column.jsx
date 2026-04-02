import Section from '../Section'
import Issue from './Issue'

const Column = ({ column }) => {
    const issues = [
        { id: 1, title: 'title1' },
        { id: 2, title: 'title2' },
        { id: 3, title: 'title3' },
        { id: 4, title: 'title4' },
        { id: 5, title: 'title5' },
        { id: 6, title: 'title6' },
    ]
    return (
        <div className="column">
            <Section className='columnName'>
                {column.name}
            </Section>
            <Section className='issues'>
                {issues.map((issue) => (
                    <Issue issue={issue} key={issue.id} />
                ))}
            </Section>
        </div>
    )
}

export default Column