import Section from '../Section'
import Button from '../Button'

const Columns = ({ columns }) => {
    return (
        <Section className='full-width'>
            <div className='board__header'>
                <div className="h1">Доска</div>
                <Button className='left'>Добавить задачу</Button>
            </div>
            <div className="columnsContainer">
                {columns.map((column) => {
                    column.issues = [
                        { id: 1, title: 'title1' },
                        { id: 2, title: 'title2' },
                        { id: 3, title: 'title3' },
                        { id: 4, title: 'title4' },
                        { id: 5, title: 'title5' },
                        { id: 6, title: 'title6' },
                    ]

                    return (
                        <div className="column" key={column.id}>
                            <Section className='columnName'>
                                {column.name}
                            </Section>
                            <Section className='issues'>
                                {column.issues.map((issue) => (
                                    <div key={issue.id}>{issue.title}</div>
                                ))}
                            </Section>
                        </div>
                    )
                })}
            </div>
        </Section>
    )
}

export default Columns