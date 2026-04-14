import { memo, useCallback, useContext, useEffect, useState } from 'react'
import Field from '../Field'
import TextAreaField from '../TextAreaField'
import { ProjectContext } from '../../context/Project/ProjectContext'
import { useEditProjectModalSection } from '../../hook/useEditProjectModalSection'
import ModalSection from '../ModalSection'
import projectAPI from '../../api/projectAPI'

const EditProjectSection = ({ ref = null }) => {
    const { project, setProject } = useContext(ProjectContext)
    const [isWaiting, setIsWaiting] = useState(false)
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
        validateValues,
    } = useEditProjectModalSection()

    useEffect(() => initValues(project),
        [project, initValues])

    const handleProjectSubmit = useCallback(async () => {
        setIsWaiting(true)

        if (!validateValues()) {
            setIsWaiting(false)
            return false
        }

        try {
            const trimmedName = projectName.trim();
            const trimmedShortName = projectShortName.trim();
            const trimmedDescription = projectDescription.trim();

            if (project.name !== trimmedName ||
                project.shortName !== trimmedShortName ||
                project.description !== trimmedDescription) {

                await projectAPI.update({
                    Name: trimmedName,
                    ShortName: trimmedShortName,
                    Description: trimmedDescription,
                    ProjectId: project.id,
                })

                setProject(prev => ({
                    ...prev,
                    name: trimmedName,
                    shortName: trimmedShortName,
                    description: trimmedDescription
                }))

                initValues(project)
            }
            setIsWaiting(false)
            return true
        } catch (error) {
            console.error('Ошибка при редактировании проекта:', error)
            setIsWaiting(false)
            return false
        }
    }, [
        project,
        projectName,
        projectShortName,
        projectDescription,
        setProject,
        validateValues,
        initValues
    ])

    return (
        <ModalSection
            onClick={handleProjectSubmit}
            isDisabled={isWaiting}
            buttonTitle='Обновить'
            ref={ref}
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