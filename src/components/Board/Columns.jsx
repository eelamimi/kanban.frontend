import Section from '../Section'
import Button from '../Button'
import Column from './Column'

const Columns = ({ columns }) => {
    return (
        <Section className='full-width'>
            <div className='board__header'>
                <div className="h1">Доска</div>
                <Button className='left'>Добавить задачу</Button>
            </div>
            <div className="columns">
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
                        <Column column={column} key={column.id} />
                    )
                })}
            </div>
        </Section>
    )
}

export default Columns