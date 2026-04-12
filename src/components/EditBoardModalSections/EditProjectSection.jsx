import { memo, useCallback, useContext, useEffect } from 'react'
import Field from '../Field'
import TextAreaField from '../TextAreaField'
import { ProjectContext } from '../../context/Project/ProjectContext'
import { useEditProjectModalSection } from '../../hook/useEditProjectModalSection'
import ModalSection from '../ModalSection'

const EditProjectSection = () => {
    const { project } = useContext(ProjectContext)
    const {
        projectName,
        projectShortName,
        projectDescription,
        errorProjectName,
        errorProjectShortName,
        errorProjectDescription,
        onProjectNameInput,
        onProjectShortNameInput,
        onProjectDescriptionInput,
        initValues,
    } = useEditProjectModalSection()

    useEffect(() => initValues(project),
        [project, initValues])
    const handleProjectSubmit = useCallback(async () => {
        return true
    }, [])

    return (
        <ModalSection
            onClick={handleProjectSubmit}
            buttonTitle='Обновить'
        >
            <div className='row' style={{ gap: '25px' }}>
                <Field
                    id='projectName'
                    fieldClassName='full-width'
                    inputClassName='full-width'
                    label='Название'
                    type='text'
                    value={projectName}
                    onInput={onProjectNameInput}
                    error={errorProjectName}
                />
                <Field
                    id='projectShortName'
                    fieldClassName='full-width'
                    inputClassName='full-width'
                    label='Ключ проекта'
                    type='text'
                    value={projectShortName}
                    onInput={onProjectShortNameInput}
                    error={errorProjectShortName}
                />
            </div>
            <TextAreaField
                id='projectDescription'
                inputClassName='full-width'
                textareaClassName='full-width'
                type='text'
                label='Описание'
                value={projectDescription}
                onInput={onProjectDescriptionInput}
                error={errorProjectDescription}
            />
        </ModalSection>
    )
}

export default memo(EditProjectSection)