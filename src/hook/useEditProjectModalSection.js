import { useCallback, useState } from 'react'

export const useEditProjectModalSection = ({ isAdd = false }) => {
    const [projectName, setProjectName] = useState('')
    const [projectShortName, setProjectShortName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')

    const [errorProjectName, setErrorProjectName] = useState('')
    const [errorProjectShortName, setErrorProjectShortName] = useState('')
    const [errorProjectDescription, setErrorProjectDescription] = useState('')

    const onProjectNameInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setProjectName(value)
        if (isAdd)
            setErrorProjectName(hasOnlySpaces ? 'Название обязательно' : '')
        else
            setErrorProjectName(hasOnlySpaces || value.length === 0 ? 'Название обязательно' : '')
    }, [isAdd])

    const onProjectShortNameInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setProjectShortName(value)
        if (isAdd)
            setErrorProjectShortName(hasOnlySpaces ? 'Ключ проекта обязателен' : '')
        else
            setErrorProjectShortName(hasOnlySpaces || value.length === 0 ? 'Ключ проекта обязателен' : '')
    }, [isAdd])

    const onProjectDescriptionInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setProjectDescription(value)
        if (isAdd)
            setErrorProjectDescription(hasOnlySpaces ? 'Описание обязательно' : '')
        else
            setErrorProjectDescription(hasOnlySpaces || value.length === 0 ? 'Описание обязательно' : '')
    }, [isAdd])

    const validateValues = useCallback(() => {
        let isValid = true

        let clearValue = projectName.trim()
        let hasOnlySpaces = projectName.length > 0 && clearValue.length === 0
        if (hasOnlySpaces || projectName.length === 0) {
            setErrorProjectName('Название обязательно')
            isValid = false
        }

        clearValue = projectShortName.trim()
        hasOnlySpaces = projectShortName.length > 0 && clearValue.length === 0
        if (hasOnlySpaces || projectShortName.length === 0) {
            setErrorProjectShortName('Ключ проекта обязателен')
            isValid = false
        }

        clearValue = projectDescription.trim()
        hasOnlySpaces = projectDescription.length > 0 && clearValue.length === 0
        if (hasOnlySpaces || projectDescription.length === 0) {
            setErrorProjectDescription('Описание обязательно')
            isValid = false
        }

        return isValid
    }, [
        projectName, setErrorProjectName,
        projectShortName, setErrorProjectShortName,
        projectDescription, setErrorProjectDescription,
    ])

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