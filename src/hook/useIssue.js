import { useEffect, useState, useCallback } from 'react'
import { useParams, useSearchParams } from 'react-router'
import issueAPI from '../api/issueAPI'
import AuthService from '../service/AuthService'
import commentaryAPI from '../api/commentaryAPI'

export const useIssue = () => {
    const [searchParams] = useSearchParams()
    const projectIdFromUrl = searchParams.get('projectId')
    const { issuePublicId } = useParams()
    const [issue, setIssue] = useState(null)
    const [isLoadingIssue, setIsLoadingIssue] = useState(true)

    useEffect(() => {
        async function fetchIssue() {
            try {
                const response = await issueAPI.get({
                    issuePublicId,
                    projectId: projectIdFromUrl
                })
                setIssue(response)
                setIsLoadingIssue(false)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchIssue()
    }, [issuePublicId, projectIdFromUrl])

    const addCommentary = useCallback(async (formData) => {
        formData.append('IssueId', issue !== null ? issue.id : 'something')
        formData.append('AuthorId', AuthService.getUserInfo().userProfileId)

        const response = await issueAPI.addCommentary(formData)

        setIssue(response)
    }, [issue])

    const updateCommentary = useCallback(async (id, content) => {
        const response = await commentaryAPI.updateContent({
            Id: id,
            UserProfileId: AuthService.getUserInfo().userProfileId,
            Content: content
        })

        setIssue(prev => ({
            ...prev,
            commentaries: prev.commentaries.map(com =>
                com.id === id ? response : com
            )
        }))
    }, [])

    const deleteCommentary = useCallback(async (id) => {
        await commentaryAPI.delete({
            Id: id,
            UserProfileId: AuthService.getUserInfo().userProfileId,
        })

        setIssue(prev => ({
            ...prev,
            commentaries: prev.commentaries.filter(com => com.id !== id)
        }))
    }, [])

    return {
        issue,
        isLoadingIssue,
        addCommentary,
        updateCommentary,
        deleteCommentary
    }
}