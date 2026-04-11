import { memo, useContext } from 'react'
import { ProjectContext } from '../../context/Project/ProjectContext'

const Filters = () => {
    const { project } = useContext(ProjectContext)

    return (
        <div className="filtersContainer">
            <div className="field-ro_label">Фильтры:</div>
            <div className='filters'>
                {project.members.map((filter) =>
                    <span className='filter' key={filter.id}>{filter.firstName}</span>
                )}
            </div>
        </div>
    )
}

export default memo(Filters)