import { memo, useContext } from 'react'
import { ProjectContext } from '../../context/Project/ProjectContext'
import Filter from './Filter'
import Span from '../Span'

const Filters = () => {
    const { project } = useContext(ProjectContext)

    return (
        <div className='filtersContainer'>
            <Span
                labelClassName='color-black bold'
                label='Фильтры'
            />
            <div className='membersContainer'>
                <Span
                    className='no-margin-top'
                    label='По автору:'
                />
                {project.members.map((member) =>
                    <Filter
                        key={member.id}
                        member={member}
                    />
                )}
            </div>
            <div className='membersContainer'>
                <Span
                    className='no-margin-top'
                    label='По исполнителю:'
                />
                {project.members.map((member) =>
                    <Filter
                        key={member.id}
                        member={member}
                        isAssignee
                    />
                )}
            </div>
        </div>
    )
}

export default memo(Filters)