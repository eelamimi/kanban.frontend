import Section from '../Section'

const BoardFilters = ({ filters }) => {
    return (
        <Section className={'full-width'}>
            <div className="h1">Фильтры</div>
            {filters.map((filter) => {
                return (
                    <span>{filter.fullName}</span>
                )
            })}
        </Section>
    )
}

export default BoardFilters