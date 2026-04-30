import { useCallback, memo, useContext, useState } from 'react'
import { UserInfoContext } from '../../context/UserInfo/UserInfoContext'
import { TeamContext } from '../../context/Team/TeamContext'
import { showError } from '../../utils/errorHandler'
import Modal from '../Modal'
import Field from '../Field'
import TextAreaField from '../TextAreaField'
import { useEditProjectModalSection } from '../../hook/useEditProjectModalSection'
import projectAPI from '../../api/projectAPI'

function AddProjectModal({ isOpen, onClose }) {
    const { team, setTeam } = useContext(TeamContext)
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
        validateValues,
        resetValues,
    } = useEditProjectModalSection({ isAdd: true })

    const addProject = useCallback(async () => {
        if (!validateValues())
            return false

        setIsWaiting(true)
        try {
            const response = await projectAPI.add({
                TeamId: team.id,
                Name: projectName,
                ShortName: projectShortName,
                Description: projectDescription
            })
            setTeam(prev => ({
                ...prev,
                projects: [...prev.projects, response]
            }))
            return true
        }
        catch (err) {
            showError(err.message || 'Ошибка добавления проекта')
            return false
        }
        finally {
            setIsWaiting(false)
        }
    }, [
        team.id,
        setTeam,
        projectName,
        projectShortName,
        projectDescription,
        validateValues
    ])

    const handleClose = useCallback(() => {
        onClose()
        resetValues()
    }, [onClose, resetValues])

    return (
        <Modal
            isOpen={isOpen}
            title={'Добавление проекта'}
            actionTitle={'Добавить'}
            onAction={addProject}
            onClose={handleClose}
            isDisabled={isWaiting}
        >
            <div className='row' style={{ gap: '25px' }}>
                <Field
                    id='projectTitle'
                    fieldClassName='full-width'
                    inputClassName='full-width'
                    type='text'
                    label='Название'
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
        </Modal>
    )
}

export default memo(AddProjectModal)