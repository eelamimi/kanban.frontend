import { memo } from 'react'

const Filters = ({ filters }) => {
    return (
        <div className="filtersContainer">
            <div className="field-ro_label">Фильтры:</div>
            <div className='filters'>
                {filters.map((filter) =>
                    <span className='filter' key={filter.id}>{filter.firstName}</span>
                )}
            </div>
        </div>
    )
}

export default memo(Filters)