import { useCallback, useState } from 'react'

export const useEditProjectModalSection = () => {
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
        setErrorProjectName(hasOnlySpaces || value.length === 0 ? 'Название обязательно' : '')
    }, [])

    const onProjectShortNameInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setProjectShortName(value)
        setErrorProjectShortName(hasOnlySpaces || value.length === 0 ? 'Ключ проекта обязателен' : '')
    }, [])

    const onProjectDescriptionInput = useCallback(({ target }) => {
        const { value } = target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0

        setProjectDescription(value)
        setErrorProjectDescription(hasOnlySpaces || value.length === 0 ? 'Описание обязательно' : '')
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
    }
}