import { useCallback, useState } from 'react'
import { isBlank } from '../utils/fieldValidation'

export const useEditProjectModalSection = ({ isAdd = false }) => {
    const [projectName, setProjectName] = useState('')
    const [projectShortName, setProjectShortName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')

    const [errorProjectName, setErrorProjectName] = useState('')
    const [errorProjectShortName, setErrorProjectShortName] = useState('')
    const [errorProjectDescription, setErrorProjectDescription] = useState('')

    const onProjectNameInput = useCallback(({ target }) => {
        const { value } = target
        setProjectName(value)
        const isEmptyOrSpaces = isAdd ? (value.length > 0 && isBlank(value)) : isBlank(value)
        setErrorProjectName(isEmptyOrSpaces ? 'Название обязательно' : '')
    }, [isAdd])

    const onProjectShortNameInput = useCallback(({ target }) => {
        const { value } = target
        setProjectShortName(value)
        const isEmptyOrSpaces = isAdd ? (value.length > 0 && isBlank(value)) : isBlank(value)
        setErrorProjectShortName(isEmptyOrSpaces ? 'Ключ проекта обязателен' : '')
    }, [isAdd])

    const onProjectDescriptionInput = useCallback(({ target }) => {
        const { value } = target
        setProjectDescription(value)
        const isEmptyOrSpaces = isAdd ? (value.length > 0 && isBlank(value)) : isBlank(value)
        setErrorProjectDescription(isEmptyOrSpaces ? 'Описание обязательно' : '')
    }, [isAdd])

    const validateValues = useCallback(() => {
        let isValid = true

        if (isBlank(projectName)) {
            setErrorProjectName('Название обязательно')
            isValid = false
        }

        if (isBlank(projectShortName)) {
            setErrorProjectShortName('Ключ проекта обязателен')
            isValid = false
        }

        if (isBlank(projectDescription)) {
            setErrorProjectDescription('Описание обязательно')
            isValid = false
        }

        return isValid
    }, [projectName, projectShortName, projectDescription])

    const resetValues = useCallback(() => {
        setProjectName('')
        setErrorProjectName('')
        setProjectShortName('')
        setErrorProjectShortName('')
        setProjectDescription('')
        setErrorProjectDescription('')
    }, [])

    const initValues = useCallback((project) => {
        setProjectName(project.name)
        setProjectShortName(project.shortName)
        setProjectDescription(project.description)
    }, [])

    return {
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
        resetValues
    }
}
