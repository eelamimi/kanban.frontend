import Section from '../Section'
import Button from '../Button'
import Column from './Column'

const Columns = ({ columns }) => {
    return (
        <Section className='full-width'>
            <div className='subsection'>
                <div className="h1">Доска</div>
                <Button className='left'>Добавить задачу</Button>
            </div>
            <div className="columns">
                {columns.map((column) => {
                    return (
                        <Column column={column} key={column.id} />
                    )
                })}
            </div>
        </Section>
    )
}

export default Columns